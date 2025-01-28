const express = require('express');
const cors = require('cors');
const app = express();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'notes_app',
  password: '123',
  port: 5432,
});

app.use(cors());
app.use(express.json());

// Получение всех тегов
app.get('/api/tags', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tags ORDER BY id ASC;');
    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка при получении тегов:', error);
    res.status(500).json({ message: 'Ошибка при получении тегов' });
  }
});

// Получение всех заметок
app.get('/api/notes', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
          n.id,
          n.title,
          n.content,
          n.created_at,
          n.date,
          n.time,
          ARRAY_AGG(t.name) AS tags
      FROM 
          notes n
      LEFT JOIN 
          note_tags nt ON n.id = nt.note_id
      LEFT JOIN 
          tags t ON nt.tag_id = t.id
      GROUP BY 
          n.id
      ORDER BY 
          n.id ASC;
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка при получении заметок:', error);
    res.status(500).json({ message: 'Ошибка при получении заметок' });
  }
});

// Создание новой заметки
app.post('/api/notes', async (req, res) => {
  const { title, content, date, time, tags } = req.body;

  try {
    const result = await pool.query(`
      INSERT INTO notes (title, content, date, time)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [title, content, date, time]);

    const newNote = result.rows[0];

    if (tags && tags.length > 0) {
      const noteId = newNote.id;
      const tagPromises = tags.map(tagId => {
        return pool.query(`
          INSERT INTO note_tags (note_id, tag_id)
          VALUES ($1, $2);
        `, [noteId, tagId]);
      });
      await Promise.all(tagPromises);
    }

    res.status(201).json(newNote);
  } catch (error) {
    console.error('Ошибка при создании заметки:', error);
    res.status(500).json({ message: 'Ошибка при создании заметки' });
  }
});

// Обновление заметки
app.put('/api/notes/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, date, time, tags } = req.body;

  try {
    const result = await pool.query(`
      UPDATE notes 
      SET title = $1, content = $2, date = $3, time = $4
      WHERE id = $5
      RETURNING *;
    `, [title, content, date, time, id]);

    const updatedNote = result.rows[0];

    if (tags && tags.length > 0) {
      await pool.query('DELETE FROM note_tags WHERE note_id = $1', [id]); 
      const tagPromises = tags.map(tagId => {
        return pool.query(`
          INSERT INTO note_tags (note_id, tag_id)
          VALUES ($1, $2);
        `, [id, tagId]);
      });
      await Promise.all(tagPromises);
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error('Ошибка при обновлении заметки:', error);
    res.status(500).json({ message: 'Ошибка при обновлении заметки' });
  }
});

// Удаление заметки
app.delete('/api/notes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM note_tags WHERE note_id = $1', [id]); 
    await pool.query('DELETE FROM notes WHERE id = $1', [id]); 
    res.status(204).send();
  } catch (error) {
    console.error('Ошибка при удалении заметки:', error);
    res.status(500).json({ message: 'Ошибка при удалении заметки' });
  }
});

// Создание нового тега
app.post('/api/tags', async (req, res) => {
  const { name } = req.body;
  try {
    const result = await pool.query(`
      INSERT INTO tags (name)
      VALUES ($1)
      RETURNING *;
    `, [name]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Ошибка при создании тега:', error);
    res.status(500).json({ message: 'Ошибка при создании тега' });
  }
});
app.get('/api/reminders', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reminders ORDER BY id ASC;');
    console.log(result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка при получении напоминаний:', error);
    res.status(500).json({ message: 'Ошибка при получении напоминаний' });
  }
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
