import { Status } from '../types/Status';

type SetStatusAction = {
  type: 'filter/SETSTATUS',
  payload: string;
};

type SetQueryAction = {
  type: 'filter/SETQUERY';
  payload: string;
};

const setStatus = (status: string): SetStatusAction => ({
  type: 'filter/SETSTATUS',
  payload: status,
});

const setQuery = (input: string): SetQueryAction => ({
  type: 'filter/SETQUERY',
  payload: input,
});

export const actions = { setStatus, setQuery };

type InitialState = {
  query: string,
  status: string,
};

type Action = SetQueryAction | SetStatusAction;

const initialState = {
  query: '',
  status: Status.All,
};

const filterReducer = (
  filter: InitialState = initialState,
  action: Action,
): InitialState => {
  switch (action.type) {
    case 'filter/SETQUERY':
      return {
        ...filter,
        query: action.payload,
      };
    case 'filter/SETSTATUS':
      return {
        ...filter,
        status: action.payload,
      };

    default:
      return filter;
  }
};

export default filterReducer;
