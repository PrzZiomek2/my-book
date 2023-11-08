import { useReducer } from "react";

interface InitialState {
  loading: boolean;
  error: string;
  results: Record<string, any>;
}

const initialState: InitialState = {
  loading: false,
  error: "",
  results: {},
};

export enum ActionType {
  FETCH_SUCCESS = 'FETCH_SUCCESS',
  FETCH_ERROR = 'FETCH_ERROR',
  FETCH_INIT = 'FETCH_INIT',
}

type FetchSuccessAction = {
  type: ActionType.FETCH_SUCCESS;
  payload: Record<string, any> | {};
}

type FetchInitAction = {
  type: ActionType.FETCH_INIT;
}

type FetchErrorAction = {
  type: ActionType.FETCH_ERROR;
  error: string;
}

type Action = FetchErrorAction | FetchSuccessAction | FetchInitAction;

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.FETCH_INIT:
      return {
        ...state,
        loading: true,
        error: "",
        results: {},
      };
    case ActionType.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        results: action.payload,
      };
    case ActionType.FETCH_ERROR:
      return {
        ...state,
        loading: false,
        results: {},
        error: action.error,
      };
    default:
      return state;
  }
};


export const useFetchReducer = () => useReducer(reducer, initialState);