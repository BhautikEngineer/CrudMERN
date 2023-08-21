import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    axios.get('http://localhost:8000/api/todos')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
  };

  const addTodo = (text) => {
    const newTodo = { text };

    axios.post('http://localhost:8000/api/todos', newTodo)
      .then(response => {
        const createdTodo = response.data;
        setTodos([...todos, createdTodo]);
      })
      .catch(error => {
        console.error('Error creating todo:', error);
      });
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:8000/api/todos/${id}`)
      .then(response => {
        const updatedTodos = todos.filter(todo => todo._id !== id);
        setTodos(updatedTodos);
      })
      .catch(error => {
        console.error('Error deleting todo:', error);
      });
  };

  const updateTodo = (id, text) => {
    const updatedTodo = { text };

    axios.put(`http://localhost:8000/api/todos/${id}`, updatedTodo)
      .then(response => {
        const updatedTodos = todos.map(todo => {
          if (todo._id === id) {
            return {
              ...todo,
              text: response.data.text
            };
          }
          return todo;
        });
        setTodos(updatedTodos);
      })
      .catch(error => {
        console.error('Error updating todo:', error);
      });
  };

  return (
    <div className="todo-container">
      <h1 className="todo-heading">To-Do List</h1>
      <TodoForm addTodo={addTodo} />
      <div className="todo-list">
        {todos.map(todo => (
          <TodoItem
            key={todo._id}
            todo={todo}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
