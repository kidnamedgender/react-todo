import React from 'react';
import cls from './Todo.module.css';
const Todo = ({ id, todo, onRemoveTodo, isCompleted, onCompleteTodo, date }) => {
  return (
    <li className={cls.wrapper}>
      <b>
        {id + 1}
        <input type="checkbox" onChange={() => onCompleteTodo(todo)} checked={isCompleted} />
      </b>
      <div className={cls.mainInf}>
        <p style={isCompleted ? { textDecoration: 'line-through' } : {}}>{todo}</p>
        <h4>{date}</h4>
      </div>
      <img
        width={30}
        onClick={() => onRemoveTodo(todo)}
        style={{ cursor: 'pointer' }}
        src="img/x-icon-black.png"
        alt="remove-icon"
      />
    </li>
  );
};

export default Todo;
