const mongoose = require('mongoose');
const Subject = require('./models/Subject');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

const subjects = [
  // Class 6
  {
    name: 'English',
    class: 6,
    chapters: [
      { title: 'Who Did Patrick\'s Homework?', content: 'A story about a boy and an elf.', videoUrl: 'https://example.com/video1' },
      { title: 'How the Dog Found Himself a New Master!', content: 'A fable by Tolstoy.', videoUrl: 'https://example.com/video2' },
    ]
  },
  {
    name: 'Mathematics',
    class: 6,
    chapters: [
      { title: 'Knowing Our Numbers', content: 'Large numbers and Roman numerals.', videoUrl: 'https://example.com/video6' },
      { title: 'Whole Numbers', content: 'Properties of whole numbers.', videoUrl: 'https://example.com/video7' },
    ]
  }
];

const seedDB = async () => {
  try {
    await Subject.deleteMany({});
    await Subject.insertMany(subjects);
    console.log('Database seeded successfully');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();