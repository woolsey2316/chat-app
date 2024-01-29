import { CONNECTION_CHANGED } from '../actions';

const INITIAL_STATE = {
  connected: false,
  port: '3001'
};

function socketReducer(state = INITIAL_STATE, action: { type: string, port: string, connected: boolean }) {
  switch (action.type) {
    case CONNECTION_CHANGED:
      let reduced = Object.assign({}, state, {
        connected: action.connected,
        isError: false
      });
      return reduced
    default:
      return state;
  }
}

export default socketReducer;