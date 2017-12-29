export enum ACTION {
  LOAD_SUCCESS = "LOAD_SUCCESS",
  SELECT = "SELECT",
  REMOVE_ONE = "REMOVE_ONE",
  EDIT_ONE = "EDIT_ONE",
  QUERY = "QUERY",
  CREATE_ONE = "CREATE_ONE"
}

export interface IState {
  list: ITodo[];
  current: ITodo;
  count?: number;
}

export interface IAction {
  type: ACTION;
  payload?: any;
}

export interface IAppState {
  todo: IState;
}

export interface ITodo {
  ID: string;
  description: string;
  done: boolean;
}

const initialState: IState = {
  current: null,
  list: [],
  count: 0
};

export function todoReducer(
  state: IState = initialState,
  action: IAction) {
    switch (action.type) {
      case ACTION.LOAD_SUCCESS:
        return {
          list: action.payload.items,
          current: state.current,
          count: action.payload.count
        };
      case "SELECT":
        if (!action.payload || !action.payload.ID) {
          return null;
        }

        return {
          list: state.list,
          current: action.payload,
          count: state.count
        };
      case "REMOVE_ONE":
        return state;
      case "EDIT_ONE":
        return state;
      case "QUERY":
        return state;
      case "CREATE_ONE":
        return state;
      default:
        return state;
    }
}
