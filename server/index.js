import express from 'express';
import { createClient } from '@libsql/client';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const db = createClient({
  url: 'file:hotel.db'
});

async function initDB() {
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS rooms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        capacity INTEGER NOT NULL,
        image_url TEXT NOT NULL
      )
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        room_id INTEGER NOT NULL,
        guest_name TEXT NOT NULL,
        email TEXT NOT NULL,
        check_in DATE NOT NULL,
        check_out DATE NOT NULL,
        FOREIGN KEY (room_id) REFERENCES rooms (id)
      )
    `);

    const rooms = await db.execute('SELECT * FROM rooms');
    if (rooms.rows.length === 0) {
      await db.execute(`
        INSERT INTO rooms (name, description, price, capacity, image_url) VALUES
        ('Deluxe Suite', 'Spacious suite with ocean view', 299.99, 2, 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800'),
        ('Family Room', 'Perfect for families, includes kitchen', 399.99, 4, 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800'),
        ('Presidential Suite', 'Luxury suite with private balcony', 599.99, 2, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800')
      `);
    }
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
}

// Initialize database before starting the server
initDB().then(() => {
  // API Routes
  app.get('/api/rooms', async (req, res) => {
    try {
      const result = await db.execute('SELECT * FROM rooms');
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/rooms/:id', async (req, res) => {
    try {
      const result = await db.execute({
        sql: 'SELECT * FROM rooms WHERE id = ?',
        args: [req.params.id]
      });
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Room not found' });
      } else {
        res.json(result.rows[0]);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/bookings', async (req, res) => {
    const { room_id, guest_name, email, check_in, check_out } = req.body;
    try {
      const result = await db.execute({
        sql: `INSERT INTO bookings (room_id, guest_name, email, check_in, check_out)
              VALUES (?, ?, ?, ?, ?)`,
        args: [room_id, guest_name, email, check_in, check_out]
      });
      res.status(201).json({
        id: result.lastInsertId,
        room_id,
        guest_name,
        email,
        check_in,
        check_out
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}).catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
