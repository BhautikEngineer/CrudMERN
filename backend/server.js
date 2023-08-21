const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/todo-app', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define Todo schema
const todoSchema = new mongoose.Schema({
  text: String,
});

// Create Todo model
const Todo = mongoose.model('Todo', todoSchema);

// API router
const apiRouter = express.Router();

// Get all todos
apiRouter.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new todo
apiRouter.post('/todos', async (req, res) => {
  try {
    const newTodo = req.body;
    const todo = await Todo.create(newTodo);
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a todo
apiRouter.put('/todos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedTodo = req.body;
    const todo = await Todo.findByIdAndUpdate(id, updatedTodo, { new: true });
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a todo
apiRouter.delete('/todos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findByIdAndDelete(id);
    if (todo) {
      res.json({ message: 'Todo deleted successfully' });
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mount the API router
app.use('/api', apiRouter);

// Handle root path
app.get('/', (req, res) => {
  res.send('Welcome to the Todo App');
  
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
