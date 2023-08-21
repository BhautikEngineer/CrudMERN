import React, { useState } from 'react';

const TodoItem = ({ todo, deleteTodo, updateTodo }) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedText, setUpdatedText] = useState(todo.text);
  const [checked, setChecked] = useState(todo.completed);

  const handleDelete = () => {
    deleteTodo(todo._id);
  };

  const handleUpdate = () => {
    updateTodo(todo._id, updatedText);
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    setUpdatedText(e.target.value);
  };

  const handleCheck = () => {
    const updatedTodo = { ...todo, completed: !checked };
    updateTodo(todo._id, updatedText); // Pass updatedText instead of updatedTodo
    setChecked(!checked);
  };
  

  return (
    <div className="todo-item">
      <input type="checkbox" checked={checked} onChange={handleCheck} />
      
      {editMode ? (
        <input
          type="text"
          value={updatedText}
          onChange={handleInputChange}
        />
      ) : (
        <span className={`todo-text ${checked ? 'completed' : ''}`}>
          {todo.text}
        </span>
      )}

      <div>
        {editMode ? (
          <button className="update-button" onClick={handleUpdate}>
            &#x2713; {/* Unicode symbol for checkmark */}
          </button>
        ) : (
          <>
            <button className="edit-button" onClick={() => setEditMode(true)}>
              ✏️ {/* Unicode symbol for pencil */}
            </button>
            <button className="delete-button" onClick={handleDelete}>
              &#x2716; {/* Unicode symbol for cross */}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
