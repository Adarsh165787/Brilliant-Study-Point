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
      { title: 'Taro\'s Reward', content: 'A folktale from Japan.', videoUrl: 'https://example.com/video3' },
      { title: 'An Indian-American Woman in Space: Kalpana Chawla', content: 'Biography of Kalpana Chawla.', videoUrl: 'https://example.com/video4' },
      { title: 'A Different Kind of School', content: 'About alternative education.', videoUrl: 'https://example.com/video5' },
    ]
  },
  {
    name: 'Mathematics',
    class: 6,
    chapters: [
      { title: 'Knowing Our Numbers', content: 'Large numbers and Roman numerals.', videoUrl: 'https://example.com/video6' },
      { title: 'Whole Numbers', content: 'Properties of whole numbers.', videoUrl: 'https://example.com/video7' },
      { title: 'Playing with Numbers', content: 'Factors and multiples.', videoUrl: 'https://example.com/video8' },
      { title: 'Basic Geometrical Ideas', content: 'Points, lines, and angles.', videoUrl: 'https://example.com/video9' },
      { title: 'Understanding Elementary Shapes', content: 'Triangles and quadrilaterals.', videoUrl: 'https://example.com/video10' },
      { title: 'Integers', content: 'Positive and negative numbers.', videoUrl: 'https://example.com/video11' },
      { title: 'Fractions', content: 'Types of fractions.', videoUrl: 'https://example.com/video12' },
      { title: 'Decimals', content: 'Decimal numbers.', videoUrl: 'https://example.com/video13' },
      { title: 'Data Handling', content: 'Pictographs and bar graphs.', videoUrl: 'https://example.com/video14' },
      { title: 'Mensuration', content: 'Perimeter and area.', videoUrl: 'https://example.com/video15' },
      { title: 'Algebra', content: 'Introduction to algebra.', videoUrl: 'https://example.com/video16' },
      { title: 'Ratio and Proportion', content: 'Ratios and proportions.', videoUrl: 'https://example.com/video17' },
      { title: 'Symmetry', content: 'Lines of symmetry.', videoUrl: 'https://example.com/video18' },
      { title: 'Practical Geometry', content: 'Construction of angles.', videoUrl: 'https://example.com/video19' },
    ]
  },
  {
    name: 'Science',
    class: 6,
    chapters: [
      { title: 'Food: Where Does It Come From?', content: 'Sources of food.', videoUrl: 'https://example.com/video20' },
      { title: 'Components of Food', content: 'Nutrients in food.', videoUrl: 'https://example.com/video21' },
      { title: 'Fibre to Fabric', content: 'Natural and synthetic fibres.', videoUrl: 'https://example.com/video22' },
      { title: 'Sorting Materials Into Groups', content: 'Properties of materials.', videoUrl: 'https://example.com/video23' },
      { title: 'Separation of Substances', content: 'Methods of separation.', videoUrl: 'https://example.com/video24' },
      { title: 'Changes Around Us', content: 'Physical and chemical changes.', videoUrl: 'https://example.com/video25' },
      { title: 'Getting to Know Plants', content: 'Parts of plants.', videoUrl: 'https://example.com/video26' },
      { title: 'Body Movements', content: 'Human body movements.', videoUrl: 'https://example.com/video27' },
      { title: 'The Living Organisms and Their Surroundings', content: 'Habitats.', videoUrl: 'https://example.com/video28' },
      { title: 'Motion and Measurement of Distances', content: 'Types of motion.', videoUrl: 'https://example.com/video29' },
      { title: 'Light, Shadows and Reflections', content: 'Properties of light.', videoUrl: 'https://example.com/video30' },
      { title: 'Electricity and Circuits', content: 'Electric circuits.', videoUrl: 'https://example.com/video31' },
      { title: 'Fun with Magnets', content: 'Magnetic materials.', videoUrl: 'https://example.com/video32' },
      { title: 'Water', content: 'Water cycle and conservation.', videoUrl: 'https://example.com/video33' },
      { title: 'Air Around Us', content: 'Composition of air.', videoUrl: 'https://example.com/video34' },
      { title: 'Garbage In, Garbage Out', content: 'Waste management.', videoUrl: 'https://example.com/video35' },
    ]
  },
  {
    name: 'Social Science',
    class: 6,
    chapters: [
      { title: 'What, Where, How and When?', content: 'Introduction to history.', videoUrl: 'https://example.com/video36' },
      { title: 'On The Trail of the Earliest People', content: 'Early humans.', videoUrl: 'https://example.com/video37' },
      { title: 'From Gathering to Growing Food', content: 'Agriculture begins.', videoUrl: 'https://example.com/video38' },
      { title: 'In the Earliest Cities', content: 'Indus Valley Civilization.', videoUrl: 'https://example.com/video39' },
      { title: 'What Books and Burials Tell Us', content: 'Vedic period.', videoUrl: 'https://example.com/video40' },
      { title: 'Kingdoms, Kings and an Early Republic', content: 'Mauryan Empire.', videoUrl: 'https://example.com/video41' },
      { title: 'New Questions and Ideas', content: 'Buddhism and Jainism.', videoUrl: 'https://example.com/video42' },
      { title: 'Ashoka, The Emperor Who Gave Up War', content: 'Ashoka\'s reign.', videoUrl: 'https://example.com/video43' },
      { title: 'Vital Villages, Thriving Towns', content: 'Economic life.', videoUrl: 'https://example.com/video44' },
      { title: 'Traders, Kings and Pilgrims', content: 'Trade routes.', videoUrl: 'https://example.com/video45' },
      { title: 'New Empires and Kingdoms', content: 'Gupta Empire.', videoUrl: 'https://example.com/video46' },
      { title: 'Buildings, Paintings and Books', content: 'Cultural achievements.', videoUrl: 'https://example.com/video47' },
      { title: 'Understanding Diversity', content: 'Diversity in India.', videoUrl: 'https://example.com/video48' },
      { title: 'Diversity and Discrimination', content: 'Social discrimination.', videoUrl: 'https://example.com/video49' },
      { title: 'What is Government?', content: 'Types of government.', videoUrl: 'https://example.com/video50' },
      { title: 'Key Elements of a Democratic Government', content: 'Democracy.', videoUrl: 'https://example.com/video51' },
      { title: 'Panchayati Raj', content: 'Local self-government.', videoUrl: 'https://example.com/video52' },
      { title: 'Rural Administration', content: 'Rural governance.', videoUrl: 'https://example.com/video53' },
      { title: 'Urban Administration', content: 'Urban governance.', videoUrl: 'https://example.com/video54' },
      { title: 'Rural Livelihoods', content: 'Farming and non-farming.', videoUrl: 'https://example.com/video55' },
      { title: 'Urban Livelihoods', content: 'Work in cities.', videoUrl: 'https://example.com/video56' },
      { title: 'The Earth in the Solar System', content: 'Solar system.', videoUrl: 'https://example.com/video57' },
      { title: 'Globe: Latitudes and Longitudes', content: 'Maps and coordinates.', videoUrl: 'https://example.com/video58' },
      { title: 'Motions of the Earth', content: 'Rotation and revolution.', videoUrl: 'https://example.com/video59' },
      { title: 'Maps', content: 'Types of maps.', videoUrl: 'https://example.com/video60' },
      { title: 'Major Domains of the Earth', content: 'Lithosphere, hydrosphere, atmosphere.', videoUrl: 'https://example.com/video61' },
      { title: 'Major Landforms of the Earth', content: 'Mountains, plains, plateaus.', videoUrl: 'https://example.com/video62' },
      { title: 'Our Country - India', content: 'Physical features of India.', videoUrl: 'https://example.com/video63' },
      { title: 'India: Climate, Vegetation and Wildlife', content: 'Climate zones.', videoUrl: 'https://example.com/video64' },
    ]
  },
  // Class 7 - Similar structure, abbreviated for brevity
  {
    name: 'English',
    class: 7,
    chapters: [
      { title: 'Three Questions', content: 'A story by Leo Tolstoy.', videoUrl: 'https://example.com/video65' },
      { title: 'A Gift of Chappals', content: 'A story about kindness.', videoUrl: 'https://example.com/video66' },
      { title: 'Golu Grows a Nose', content: 'A story from Jungle Book.', videoUrl: 'https://example.com/video67' },
      { title: 'Chandni', content: 'A story about a goat.', videoUrl: 'https://example.com/video68' },
      { title: 'The Bear Story', content: 'A humorous story.', videoUrl: 'https://example.com/video69' },
      { title: 'A Tiger in the House', content: 'A story by Ruskin Bond.', videoUrl: 'https://example.com/video70' },
      { title: 'An Alien Hand', content: 'A science fiction story.', videoUrl: 'https://example.com/video71' },
      { title: 'The Cop and the Anthem', content: 'A story by O. Henry.', videoUrl: 'https://example.com/video72' },
    ]
  },
  {
    name: 'Mathematics',
    class: 7,
    chapters: [
      { title: 'Integers', content: 'Properties of integers.', videoUrl: 'https://example.com/video73' },
      { title: 'Fractions and Decimals', content: 'Operations on fractions.', videoUrl: 'https://example.com/video74' },
      { title: 'Data Handling', content: 'Mean, median, mode.', videoUrl: 'https://example.com/video75' },
      { title: 'Simple Equations', content: 'Solving equations.', videoUrl: 'https://example.com/video76' },
      { title: 'Lines and Angles', content: 'Types of angles.', videoUrl: 'https://example.com/video77' },
      { title: 'The Triangle and Its Properties', content: 'Properties of triangles.', videoUrl: 'https://example.com/video78' },
      { title: 'Congruence of Triangles', content: 'Congruent triangles.', videoUrl: 'https://example.com/video79' },
      { title: 'Comparing Quantities', content: 'Ratios and percentages.', videoUrl: 'https://example.com/video80' },
      { title: 'Rational Numbers', content: 'Properties of rational numbers.', videoUrl: 'https://example.com/video81' },
      { title: 'Practical Geometry', content: 'Construction of triangles.', videoUrl: 'https://example.com/video82' },
      { title: 'Perimeter and Area', content: 'Area of plane figures.', videoUrl: 'https://example.com/video83' },
      { title: 'Algebraic Expressions', content: 'Like and unlike terms.', videoUrl: 'https://example.com/video84' },
      { title: 'Exponents and Powers', content: 'Laws of exponents.', videoUrl: 'https://example.com/video85' },
      { title: 'Symmetry', content: 'Rotational symmetry.', videoUrl: 'https://example.com/video86' },
      { title: 'Visualising Solid Shapes', content: '3D shapes.', videoUrl: 'https://example.com/video87' },
    ]
  },
  // Class 8 - Similar structure
  {
    name: 'English',
    class: 8,
    chapters: [
      { title: 'The Best Christmas Present in the World', content: 'A story set in WWI.', videoUrl: 'https://example.com/video88' },
      { title: 'The Tsunami', content: 'A true story of survival.', videoUrl: 'https://example.com/video89' },
      { title: 'Glimpses of the Past', content: 'History of India.', videoUrl: 'https://example.com/video90' },
      { title: 'Bepin Choudhury\'s Lapse of Memory', content: 'A mystery story.', videoUrl: 'https://example.com/video91' },
      { title: 'The Summit Within', content: 'Mountaineering adventure.', videoUrl: 'https://example.com/video92' },
      { title: 'This is Jody\'s Fawn', content: 'A story about nature.', videoUrl: 'https://example.com/video93' },
      { title: 'A Visit to Cambridge', content: 'A letter by Jawaharlal Nehru.', videoUrl: 'https://example.com/video94' },
      { title: 'A Short Monsoon Diary', content: 'Observations during monsoon.', videoUrl: 'https://example.com/video95' },
      { title: 'The Great Stone Face-I', content: 'A story by Nathaniel Hawthorne.', videoUrl: 'https://example.com/video96' },
      { title: 'The Great Stone Face-II', content: 'Continuation of the story.', videoUrl: 'https://example.com/video97' },
    ]
  },
  // Class 9 - Science subjects
  {
    name: 'Physics',
    class: 9,
    chapters: [
      { title: 'Motion', content: 'Describing motion.', videoUrl: 'https://example.com/video98' },
      { title: 'Force and Laws of Motion', content: 'Newton\'s laws.', videoUrl: 'https://example.com/video99' },
      { title: 'Gravitation', content: 'Universal law of gravitation.', videoUrl: 'https://example.com/video100' },
      { title: 'Work and Energy', content: 'Work, power, energy.', videoUrl: 'https://example.com/video101' },
      { title: 'Sound', content: 'Production and propagation of sound.', videoUrl: 'https://example.com/video102' },
    ]
  },
  {
    name: 'Chemistry',
    class: 9,
    chapters: [
      { title: 'Matter in Our Surroundings', content: 'Physical nature of matter.', videoUrl: 'https://example.com/video103' },
      { title: 'Is Matter Around Us Pure?', content: 'Mixtures and compounds.', videoUrl: 'https://example.com/video104' },
      { title: 'Atoms and Molecules', content: 'Structure of atom.', videoUrl: 'https://example.com/video105' },
      { title: 'Structure of the Atom', content: 'Electrons, protons, neutrons.', videoUrl: 'https://example.com/video106' },
    ]
  },
  {
    name: 'Biology',
    class: 9,
    chapters: [
      { title: 'The Fundamental Unit of Life', content: 'Cell structure.', videoUrl: 'https://example.com/video107' },
      { title: 'Tissues', content: 'Plant and animal tissues.', videoUrl: 'https://example.com/video108' },
      { title: 'Diversity in Living Organisms', content: 'Classification of organisms.', videoUrl: 'https://example.com/video109' },
      { title: 'Why do we Fall Ill?', content: 'Health and diseases.', videoUrl: 'https://example.com/video110' },
      { title: 'Natural Resources', content: 'Air, water, soil.', videoUrl: 'https://example.com/video111' },
      { title: 'Improvement in Food Resources', content: 'Crop production.', videoUrl: 'https://example.com/video112' },
    ]
  },
  // Class 10 - Similar structure
  {
    name: 'Physics',
    class: 10,
    chapters: [
      { title: 'Light - Reflection and Refraction', content: 'Laws of reflection.', videoUrl: 'https://example.com/video113' },
      { title: 'Human Eye and Colourful World', content: 'Structure of eye.', videoUrl: 'https://example.com/video114' },
      { title: 'Electricity', content: 'Electric current.', videoUrl: 'https://example.com/video115' },
      { title: 'Magnetic Effects of Electric Current', content: 'Electromagnetism.', videoUrl: 'https://example.com/video116' },
      { title: 'Sources of Energy', content: 'Conventional and non-conventional.', videoUrl: 'https://example.com/video117' },
    ]
  },
  {
    name: 'Chemistry',
    class: 10,
    chapters: [
      { title: 'Chemical Reactions and Equations', content: 'Types of reactions.', videoUrl: 'https://example.com/video118' },
      { title: 'Acids, Bases and Salts', content: 'Properties of acids and bases.', videoUrl: 'https://example.com/video119' },
      { title: 'Metals and Non-metals', content: 'Physical properties.', videoUrl: 'https://example.com/video120' },
      { title: 'Carbon and its Compounds', content: 'Organic chemistry.', videoUrl: 'https://example.com/video121' },
      { title: 'Periodic Classification of Elements', content: 'Mendeleev\'s periodic table.', videoUrl: 'https://example.com/video122' },
    ]
  },
  {
    name: 'Biology',
    class: 10,
    chapters: [
      { title: 'Life Processes', content: 'Nutrition, respiration.', videoUrl: 'https://example.com/video123' },
      { title: 'Control and Coordination', content: 'Nervous system.', videoUrl: 'https://example.com/video124' },
      { title: 'How do Organisms Reproduce?', content: 'Reproduction in plants and animals.', videoUrl: 'https://example.com/video125' },
      { title: 'Heredity and Evolution', content: 'Genetics.', videoUrl: 'https://example.com/video126' },
      { title: 'Our Environment', content: 'Ecosystems.', videoUrl: 'https://example.com/video127' },
      { title: 'Management of Natural Resources', content: 'Conservation.', videoUrl: 'https://example.com/video128' },
    ]
  },
  // Class 11-12 Science (Physics, Chemistry, Maths, Biology)
  {
    name: 'Physics',
    class: 11,
    chapters: [
      { title: 'Physical World', content: 'What is physics?', videoUrl: 'https://example.com/video129' },
      { title: 'Units and Measurements', content: 'SI units.', videoUrl: 'https://example.com/video130' },
      { title: 'Motion in a Straight Line', content: 'Kinematics.', videoUrl: 'https://example.com/video131' },
      { title: 'Motion in a Plane', content: 'Vectors.', videoUrl: 'https://example.com/video132' },
      { title: 'Laws of Motion', content: 'Newton\'s laws.', videoUrl: 'https://example.com/video133' },
      { title: 'Work, Energy and Power', content: 'Conservation of energy.', videoUrl: 'https://example.com/video134' },
      { title: 'System of Particles and Rotational Motion', content: 'Torque.', videoUrl: 'https://example.com/video135' },
      { title: 'Gravitation', content: 'Kepler\'s laws.', videoUrl: 'https://example.com/video136' },
      { title: 'Mechanical Properties of Solids', content: 'Elasticity.', videoUrl: 'https://example.com/video137' },
      { title: 'Mechanical Properties of Fluids', content: 'Pressure.', videoUrl: 'https://example.com/video138' },
      { title: 'Thermal Properties of Matter', content: 'Heat.', videoUrl: 'https://example.com/video139' },
      { title: 'Thermodynamics', content: 'Laws of thermodynamics.', videoUrl: 'https://example.com/video140' },
      { title: 'Kinetic Theory', content: 'Ideal gas.', videoUrl: 'https://example.com/video141' },
      { title: 'Oscillations', content: 'Simple harmonic motion.', videoUrl: 'https://example.com/video142' },
      { title: 'Waves', content: 'Wave motion.', videoUrl: 'https://example.com/video143' },
    ]
  },
  {
    name: 'Chemistry',
    class: 11,
    chapters: [
      { title: 'Some Basic Concepts of Chemistry', content: 'Matter and its properties.', videoUrl: 'https://example.com/video144' },
      { title: 'Structure of Atom', content: 'Bohr\'s model.', videoUrl: 'https://example.com/video145' },
      { title: 'Classification of Elements and Periodicity in Properties', content: 'Periodic table.', videoUrl: 'https://example.com/video146' },
      { title: 'Chemical Bonding and Molecular Structure', content: 'Ionic and covalent bonds.', videoUrl: 'https://example.com/video147' },
      { title: 'States of Matter', content: 'Gases, liquids, solids.', videoUrl: 'https://example.com/video148' },
      { title: 'Thermodynamics', content: 'Enthalpy.', videoUrl: 'https://example.com/video149' },
      { title: 'Equilibrium', content: 'Chemical equilibrium.', videoUrl: 'https://example.com/video150' },
      { title: 'Redox Reactions', content: 'Oxidation and reduction.', videoUrl: 'https://example.com/video151' },
      { title: 'Hydrogen', content: 'Preparation and properties.', videoUrl: 'https://example.com/video152' },
      { title: 'The s-Block Elements', content: 'Group 1 and 2.', videoUrl: 'https://example.com/video153' },
      { title: 'The p-Block Elements', content: 'Group 13-18.', videoUrl: 'https://example.com/video154' },
      { title: 'Organic Chemistry - Some Basic Principles and Techniques', content: 'Purification methods.', videoUrl: 'https://example.com/video155' },
      { title: 'Hydrocarbons', content: 'Alkanes, alkenes, alkynes.', videoUrl: 'https://example.com/video156' },
      { title: 'Environmental Chemistry', content: 'Pollution.', videoUrl: 'https://example.com/video157' },
    ]
  },
  {
    name: 'Mathematics',
    class: 11,
    chapters: [
      { title: 'Sets', content: 'Set theory.', videoUrl: 'https://example.com/video158' },
      { title: 'Relations and Functions', content: 'Types of relations.', videoUrl: 'https://example.com/video159' },
      { title: 'Trigonometric Functions', content: 'Trigonometric identities.', videoUrl: 'https://example.com/video160' },
      { title: 'Principle of Mathematical Induction', content: 'Induction.', videoUrl: 'https://example.com/video161' },
      { title: 'Complex Numbers and Quadratic Equations', content: 'Complex numbers.', videoUrl: 'https://example.com/video162' },
      { title: 'Linear Inequalities', content: 'Solving inequalities.', videoUrl: 'https://example.com/video163' },
      { title: 'Permutations and Combinations', content: 'Factorial.', videoUrl: 'https://example.com/video164' },
      { title: 'Binomial Theorem', content: 'Expansion.', videoUrl: 'https://example.com/video165' },
      { title: 'Sequences and Series', content: 'Arithmetic and geometric.', videoUrl: 'https://example.com/video166' },
      { title: 'Straight Lines', content: 'Equation of line.', videoUrl: 'https://example.com/video167' },
      { title: 'Conic Sections', content: 'Circle, parabola.', videoUrl: 'https://example.com/video168' },
      { title: 'Introduction to Three Dimensional Geometry', content: '3D coordinates.', videoUrl: 'https://example.com/video169' },
      { title: 'Limits and Derivatives', content: 'Calculus basics.', videoUrl: 'https://example.com/video170' },
      { title: 'Mathematical Reasoning', content: 'Logic.', videoUrl: 'https://example.com/video171' },
      { title: 'Statistics', content: 'Mean, variance.', videoUrl: 'https://example.com/video172' },
      { title: 'Probability', content: 'Basic probability.', videoUrl: 'https://example.com/video173' },
    ]
  },
  // Class 12 - Similar structure, abbreviated
  {
    name: 'Physics',
    class: 12,
    chapters: [
      { title: 'Electric Charges and Fields', content: 'Coulomb\'s law.', videoUrl: 'https://example.com/video174' },
      { title: 'Electrostatic Potential and Capacitance', content: 'Capacitors.', videoUrl: 'https://example.com/video175' },
      { title: 'Current Electricity', content: 'Ohm\'s law.', videoUrl: 'https://example.com/video176' },
      { title: 'Moving Charges and Magnetism', content: 'Magnetic field.', videoUrl: 'https://example.com/video177' },
      { title: 'Magnetism and Matter', content: 'Earth\'s magnetism.', videoUrl: 'https://example.com/video178' },
      { title: 'Electromagnetic Induction', content: 'Faraday\'s law.', videoUrl: 'https://example.com/video179' },
      { title: 'Alternating Current', content: 'AC circuits.', videoUrl: 'https://example.com/video180' },
      { title: 'Electromagnetic Waves', content: 'Properties of EM waves.', videoUrl: 'https://example.com/video181' },
      { title: 'Ray Optics and Optical Instruments', content: 'Lenses and mirrors.', videoUrl: 'https://example.com/video182' },
      { title: 'Wave Optics', content: 'Diffraction and interference.', videoUrl: 'https://example.com/video183' },
      { title: 'Dual Nature of Radiation and Matter', content: 'Photoelectric effect.', videoUrl: 'https://example.com/video184' },
      { title: 'Atoms', content: 'Bohr\'s model.', videoUrl: 'https://example.com/video185' },
      { title: 'Nuclei', content: 'Nuclear physics.', videoUrl: 'https://example.com/video186' },
      { title: 'Semiconductor Electronics', content: 'Diodes and transistors.', videoUrl: 'https://example.com/video187' },
      { title: 'Communication Systems', content: 'Radio and TV.', videoUrl: 'https://example.com/video188' },
    ]
  },
  // Add more subjects for other classes as needed
];

const seedDB = async () => {
  try {
    await Subject.deleteMany({});
    await Subject.insertMany(subjects);
    console.log('Database seeded successfully with CBSE syllabus');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();