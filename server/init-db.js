const admin = require('firebase-admin');
  require('dotenv').config();

  // Debug environment variables
  console.log('Environment variables:');
  console.log('FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID);
  console.log('FIREBASE_CLIENT_EMAIL:', process.env.FIREBASE_CLIENT_EMAIL);
  console.log('FIREBASE_PRIVATE_KEY:', process.env.FIREBASE_PRIVATE_KEY ? 'Present' : 'Missing');

  if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_PRIVATE_KEY || !process.env.FIREBASE_CLIENT_EMAIL) {
    console.error('Error: Missing required Firebase environment variables.');
    process.exit(1);
  }

  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  };

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  const db = admin.firestore();

  async function initDB() {
    try {
      console.log('Initializing Firestore database...');

      // Clear existing data in 'users' collection
      const usersRef = db.collection('users');
      const snapshot = await usersRef.get();
      const deletePromises = snapshot.docs.map(doc => doc.ref.delete());
      await Promise.all(deletePromises);
      console.log('Cleared existing users');

      // Seed predefined entries
      const users = [
        { name: 'John', age: 30, email: 'john@example.com', city: 'New York' },
        { name: 'Alice', age: 25, email: 'alice@example.com', city: 'Los Angeles' },
        { name: 'Bob', age: 35, email: 'bob@example.com', city: 'Chicago' },
        { name: 'Emma', age: 28, email: 'emma@example.com', city: 'Houston' },
        { name: 'David', age: 40, email: 'david@example.com', city: 'Phoenix' },
        { name: 'Sophia', age: 22, email: 'sophia@example.com', city: 'Philadelphia' },
        { name: 'James', age: 33, email: 'james@example.com', city: 'San Antonio' },
        { name: 'Olivia', age: 27, email: 'olivia@example.com', city: 'San Diego' },
        { name: 'Liam', age: 29, email: 'liam@example.com', city: 'Dallas' },
        { name: 'Mia', age: 31, email: 'mia@example.com', city: 'San Jose' },
        { name: 'Noah', age: 26, email: 'noah@example.com', city: 'Austin' },
        { name: 'Isabella', age: 34, email: 'isabella@example.com', city: 'Jacksonville' },
        { name: 'Ethan', age: 23, email: 'ethan@example.com', city: 'San Francisco' },
        { name: 'Ava', age: 32, email: 'ava@example.com', city: 'Columbus' },
        { name: 'Lucas', age: 38, email: 'lucas@example.com', city: 'Seattle' }
      ];

      const addPromises = users.map(user => usersRef.add(user));
      await Promise.all(addPromises);
      console.log('Database seeded with 15 users');

      process.exit(0);
    } catch (error) {
      console.error('Error initializing database:', error);
      process.exit(1);
    }
  }

  initDB();