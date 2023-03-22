import React from 'react';
import './App.css';
import Todo from './components/Todo/Todo';

function App() {
  const [todos, setTodos] = React.useState([]);
  const [completedTodos, setCompletedTodos] = React.useState([]);
  const [addValue, setAddValue] = React.useState('');
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
    const onClickEnter = (e) => {
      if (e.code === 'Enter') {
        onAddNewTodo();
      }
    };
    document.addEventListener('keydown', onClickEnter);
    return () => {
      document.removeEventListener('keydown', onClickEnter);
    };
  }, [addValue]);

  const onAddNewTodo = () => {
    if (addValue.trim()) {
      setTodos([...todos, { text: addValue, date: new Date().toLocaleString() }]);
      setAddValue('');
    } else {
      alert('Поле ввода пусто!');
      setAddValue('');
    }
  };

  const onRemoveTodo = (getTodo) => {
    setTodos(todos.filter((todo) => todo.text !== getTodo));
    setCompletedTodos(completedTodos.filter((todo) => todo.text !== getTodo));
  };

  const onRemoveCompletedTodos = () => {
    if (completedTodos.length) {
      if (window.confirm('Вы действительно хотите удалить выделенные записи?')) {
        setTodos(todos.filter((todo) => !completedTodos.includes(todo.text)));
        setCompletedTodos([]);
      }
    }
  };

  const onCompleteTodo = (getTodo) => {
    if (completedTodos.some((todo) => todo === getTodo)) {
      setCompletedTodos(completedTodos.filter((todo) => todo !== getTodo));
    } else {
      setCompletedTodos([...completedTodos, getTodo]);
    }
  };

  const searchedTodos = React.useMemo(() => {
    return todos.filter((todo) =>
      todo.text.trim().toLowerCase().includes(searchValue.trim().toLowerCase()),
    );
  }, [searchValue, todos]);

  return (
    <div className="App">
      <div className="wrapper">
        <div className="header">
          <div className="addTodoForm">
            <img
              onClick={onAddNewTodo}
              width={25}
              style={{ cursor: 'pointer' }}
              src="img/plus-icon.png"
              alt=""
            />
            <input
              className="addInput"
              placeholder="Введите запись..."
              onChange={(e) => setAddValue(e.target.value)}
              type="text"
              value={addValue}
            />
          </div>
          <div className="searchForm">
            <input
              className="searchInput"
              placeholder="Поиск по записи..."
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              value={searchValue}
            />
          </div>
        </div>
        {searchedTodos.length ? (
          <div className="todosList">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h1>Мои записи</h1>
              <p>Всего найдено: {searchedTodos.length}</p>
            </div>
            <img
              className="trashcan"
              title="Удалить выделенные записи"
              onClick={onRemoveCompletedTodos}
              width={35}
              style={completedTodos.length ? {} : { opacity: '0.4', cursor: 'default' }}
              src="img/trash-icon.png"
              alt=""
            />
            <ul>
              {searchedTodos.map((todo, id) => (
                <Todo
                  key={todo.date + id}
                  id={id}
                  todo={todo.text}
                  onRemoveTodo={onRemoveTodo}
                  isCompleted={completedTodos.includes(todo.text)}
                  onCompleteTodo={onCompleteTodo}
                  date={todo.date}
                />
              ))}
            </ul>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ textAlign: 'center', fontSize: '28px', margin: '50px 0' }}>
              Записей не найдено :(
            </p>
            <img
              style={{ margin: '0 auto', width: '500px' }}
              src="img/not-found.gif"
              alt="not-found"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
