import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CheckCircle, Play, FileText } from 'lucide-react';

const SubjectDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedChapters, setCompletedChapters] = useState([]);

  useEffect(() => {
    if (user.role === 'teacher') return;
    fetchSubject();
  }, [id, user]);

  const fetchSubject = async () => {
    try {
      const res = await axios.get(`/api/subjects/detail/${id}`);
      setSubject(res.data);
      const progress = user.progress?.get
        ? user.progress.get(res.data.name)
        : user.progress?.[res.data.name];
      setCompletedChapters(progress ? progress.completedChapters : []);
    } catch (err) {
      toast.error('Failed to fetch subject');
    }
    setLoading(false);
  };

  const toggleChapterCompletion = async (chapterTitle) => {
    const newCompleted = completedChapters.includes(chapterTitle)
      ? completedChapters.filter(c => c !== chapterTitle)
      : [...completedChapters, chapterTitle];

    setCompletedChapters(newCompleted);

    try {
      await axios.put('/api/users/progress', {
        subject: subject.name,
        completedChapters: newCompleted,
      });
      toast.success('Progress updated!');
    } catch (err) {
      toast.error('Failed to update progress');
      setCompletedChapters(completedChapters); // revert
    }
  };

  const progressPercentage = subject ? (completedChapters.length / subject.chapters.length) * 100 : 0;

  if (user.role === 'teacher') {
    return <Navigate to="/" />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{subject.name}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
          {subject.chapters.length} chapters • {completedChapters.length} completed • {progressPercentage.toFixed(0)}% progress
        </p>

        {/* Progress Overview */}
        <div className="card mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Subject Progress</h2>
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
              <span>Overall Completion</span>
              <span>{progressPercentage.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1.5 }}
                className="bg-gradient-to-r from-primary to-secondary h-4 rounded-full"
              ></motion.div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{completedChapters.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Completed Chapters</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">{subject.chapters.length - completedChapters.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Remaining Chapters</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">{subject.chapters.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Total Chapters</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="space-y-6">
        {subject.chapters.map((chapter, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="card"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{chapter.title}</h3>
              <button
                onClick={() => toggleChapterCompletion(chapter.title)}
                className={`p-2 rounded-full ${
                  completedChapters.includes(chapter.title)
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                }`}
              >
                <CheckCircle size={24} />
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{chapter.content}</p>
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                <Play size={16} />
                <span>Watch Video</span>
              </button>
              <button className="flex items-center space-x-2 bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondary/90 transition-colors">
                <FileText size={16} />
                <span>View Notes</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SubjectDetail;