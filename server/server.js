const express = require('express');
  const admin = require('firebase-admin');
  const cors = require('cors');
  const textToQuery = require('./text-to-db');
  require('dotenv').config();

  const app = express();
  app.use(cors());
  app.use(express.json());

  const PORT = process.env.PORT || 5000;

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

  app.post('/query', async (req, res) => {
    try {
      const { query } = req.body;
      if (!query) {
        return res.status(400).json({ firestoreQuery: '', data: [], error: 'Query is required' });
      }
      const { conditions, fields, sort } = textToQuery(query);
      let queryRef = db.collection('users');

      // Apply Firestore-compatible conditions
      const containsConditions = [];
      conditions.forEach(({ field, operator, value }) => {
        if (operator === 'contains') {
          containsConditions.push({ field, value });
        } else {
          queryRef = queryRef.where(field, operator, value);
        }
      });

      // Apply sorting
      if (sort) {
        queryRef = queryRef.orderBy(sort.field, sort.direction);
      }

      // Execute query
      const snapshot = await queryRef.get();
      let data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Apply contains filtering (Firestore doesn't support natively)
      if (containsConditions.length > 0) {
        data = data.filter(item => {
          return containsConditions.every(({ field, value }) => {
            const fieldValue = item[field]?.toString().toLowerCase();
            return fieldValue && fieldValue.includes(value.toLowerCase());
          });
        });
      }

      // Select requested fields
      data = data.map(item => {
        const filteredItem = {};
        fields.forEach(field => {
          if (item[field] !== undefined) {
            filteredItem[field] = item[field];
          }
        });
        filteredItem.id = item.id; // Always include id
        return filteredItem;
      });

      res.json({
        firestoreQuery: JSON.stringify({ conditions, fields, sort }, null, 2),
        data
      });
    } catch (error) {
      console.error('Query error:', error);
      res.status(500).json({ firestoreQuery: '', data: [], error: 'Internal server error' });
    }
  });

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));