import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import SubjectCard from '../components/SubjectCard';
import axios from 'axios';
import toast from 'react-hot-toast';
import { TrendingUp, BookOpen, Award, Users, UserCheck } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.role === 'student') {
      fetchSubjects();
    } else {
      fetchStudents();
    }
  }, [user]);

  const fetchSubjects = async () => {
    try {
      const res = await axios.get(`/api/subjects/${user.class}`);
      setSubjects(res.data);
    } catch (err) {
      toast.error('Failed to fetch subjects');
    }
    setLoading(false);
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get('/api/users/students');
      setStudents(res.data);
    } catch (err) {
      toast.error('Failed to fetch students');
    }
    setLoading(false);
  };

  const getProgress = (subjectName) => {
    return user.progress?.get
      ? user.progress.get(subjectName)
      : user.progress?.[subjectName];
  };

  const overallProgress = subjects.length > 0
    ? subjects.reduce((acc, subject) => {
        const progress = getProgress(subject.name);
        return acc + (progress ? progress.percentage : 0);
      }, 0) / subjects.length
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (user.role === 'teacher') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Teacher Dashboard
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Monitor student progress and performance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <div className="flex items-center space-x-3">
              <Users className="text-primary" size={24} />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Total Students</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{students.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <div className="flex items-center space-x-3">
              <UserCheck className="text-secondary" size={24} />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Active Students</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {students.filter(s => Object.keys(s.progress).length > 0).length}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <div className="flex items-center space-x-3">
              <Award className="text-accent" size={24} />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Classes Covered</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {[...new Set(students.map(s => s.class))].length}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Student Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((student, index) => {
              const studentSubjects = Object.keys(student.progress);
              const avgProgress = studentSubjects.length > 0
                ? studentSubjects.reduce((acc, subj) => acc + student.progress[subj].percentage, 0) / studentSubjects.length
                : 0;

              return (
                <motion.div
                  key={student._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="card"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{student.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Class {student.class}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{avgProgress.toFixed(0)}%</p>
                      <p className="text-xs text-gray-500">Avg Progress</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {studentSubjects.slice(0, 3).map(subj => (
                      <div key={subj} className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">{subj}</span>
                        <span className="font-medium">{student.progress[subj].percentage.toFixed(0)}%</span>
                      </div>
                    ))}
                    {studentSubjects.length > 3 && (
                      <p className="text-xs text-gray-500">+{studentSubjects.length - 3} more subjects</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    );
  }

  // Student Dashboard
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back, {user.name}!
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Class {user.class}th Grade • Overall Progress: {overallProgress.toFixed(0)}%
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="flex items-center space-x-3">
            <BookOpen className="text-primary" size={24} />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Total Subjects</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{subjects.length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center space-x-3">
            <TrendingUp className="text-secondary" size={24} />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Overall Progress</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{overallProgress.toFixed(0)}%</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center space-x-3">
            <Award className="text-accent" size={24} />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Completed Subjects</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {subjects.filter(subject => getProgress(subject.name)?.percentage === 100).length}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your Subjects</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Click on any subject to view detailed progress and chapters</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <SubjectCard subject={subject} progress={getProgress(subject.name)} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;