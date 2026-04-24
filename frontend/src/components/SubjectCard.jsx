import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, TrendingUp } from 'lucide-react';

const SubjectCard = ({ subject, progress }) => {
  const percentage = progress ? progress.percentage : 0;
  const completedChapters = progress ? progress.completedChapters.length : 0;
  const totalChapters = subject.chapters.length;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="card"
    >
      <Link to={`/subject/${subject._id}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <BookOpen className="text-primary" size={24} />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{subject.name}</h3>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="text-secondary" size={20} />
            <span className="text-sm font-medium text-secondary">{percentage.toFixed(0)}%</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
            <span>Progress</span>
            <span>{completedChapters}/{totalChapters} chapters</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1 }}
              className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full"
            ></motion.div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-gray-600 dark:text-gray-300">
            {totalChapters} chapters available
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-primary font-medium">View Progress →</span>
            <CheckCircle className={`text-${percentage === 100 ? 'green' : 'gray'}-500`} size={16} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default SubjectCard;