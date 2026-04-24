import { useState, useEffect, Navigate } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';
import toast from 'react-hot-toast';

const Analytics = () => {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.role === 'teacher') return;
    fetchSubjects();
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

  const getProgress = (subjectName) => {
    return user.progress?.get
      ? user.progress.get(subjectName)
      : user.progress?.[subjectName];
  };

  const chartData = subjects.map(subject => {
    const progress = getProgress(subject.name);
    return {
      name: subject.name,
      progress: progress ? progress.percentage : 0,
    };
  });

  const pieData = [
    { name: 'Completed', value: subjects.filter(s => getProgress(s.name)?.percentage === 100).length },
    { name: 'In Progress', value: subjects.filter(s => {
      const p = getProgress(s.name)?.percentage || 0;
      return p > 0 && p < 100;
    }).length },
    { name: 'Not Started', value: subjects.filter(s => !getProgress(s.name) || getProgress(s.name)?.percentage === 0).length },
  ];

  const COLORS = ['#10B981', '#F59E0B', '#EF4444'];

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Performance Analytics
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Track your progress across all subjects
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Subject-wise Progress</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="progress" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Overall Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card mt-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Detailed Breakdown</h2>
        <div className="space-y-4">
          {subjects.map(subject => {
            const progress = getProgress(subject.name);
            const percentage = progress ? progress.percentage : 0;
            return (
              <div key={subject._id} className="flex items-center justify-between">
                <span className="text-gray-800 dark:text-white">{subject.name}</span>
                <div className="flex items-center space-x-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300 w-12 text-right">
                    {percentage.toFixed(0)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;