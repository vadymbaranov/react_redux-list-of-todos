/* eslint-disable max-len */
import React, { useState, useMemo, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
// import { useDispatch } from 'react-redux';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Todo } from './types/Todo';
// import { actions as todosActions } from './features/todos';
import { Status } from './types/Status';
import { getTodos } from './api';
import { actions as currentTodoActions } from './features/currentTodo';
import { actions as filterActions } from './features/filter';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  // const todos = useAppSelector(state => state.todos);

  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);

  const [loadedTodos, setLoadedTodos] = useState<Todo[]>([]);

  // const addTodo = (todoToAdd: Todo) => dispatch(todosActions.add(todoToAdd));
  // const removeTodo = (todoToRemove: Todo) => dispatch(todosActions.remove(todoToRemove));

  const setCurrentTodo = (todo: Todo) => dispatch(currentTodoActions.setTodo(todo));
  const removeCurrentTodo = () => dispatch(currentTodoActions.removeTodo());

  const setStatus = (filter: string) => dispatch(filterActions.setStatus(filter));
  const setQuery = (input: string) => dispatch(filterActions.setQuery(input));

  const visibleTodos = useMemo(() => {
    return loadedTodos.filter(todo => {
      const queried = todo?.title.toLocaleLowerCase()
        .includes(query?.toLocaleLowerCase());

      switch (status) {
        case Status.Completed:
          return todo?.completed && queried;

        case Status.Active:
          return !todo?.completed && queried;

        case Status.All:
        default:
          return queried;
      }
    });
  }, [status, query, loadedTodos]);

  useEffect(() => {
    getTodos()
      .then(setLoadedTodos);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter query={query} todosStatus={status} onChangeTodosStatus={setStatus} onChangeQuery={setQuery} />
            </div>

            <div className="block">
              {visibleTodos.length > 0 ? (
                <TodoList
                  visibleTodos={visibleTodos}
                  selectedTodo={currentTodo}
                  onSelectedTodo={setCurrentTodo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal currentTodo={currentTodo} onRemove={removeCurrentTodo} />
      )}

    </>
  );
};
