import { Todo } from '../types/Todo';
import { getTodos } from '../api';

type AddAction = {
  type: 'todos/ADD';
  payload: Todo;
};

type RemoveAction = {
  type: 'todos/REMOVE';
  payload: Todo;
};

const add = (todo: Todo): AddAction => ({
  type: 'todos/ADD',
  payload: todo,
});

const remove = (todo: Todo): RemoveAction => ({
  type: 'todos/REMOVE',
  payload: todo,
});

type Action = AddAction | RemoveAction;

export const actions = { add, remove };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialTodos: any = getTodos().then(res => res);

const todosReducer = (
  todos: Todo[] = initialTodos,
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todos/ADD':
      return [...todos, action.payload];

    case 'todos/REMOVE':
      return todos.filter(todo => todo !== action.payload);

    default:
      return todos;
  }
};

export default todosReducer;
