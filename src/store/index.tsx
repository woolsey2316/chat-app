import { combineReducers } from 'redux';
import logger from 'redux-logger'
import { Tuple, configureStore } from '@reduxjs/toolkit'
import socketReducer from './socket/reducer';
import messageReducer from './message/reducer';
import socketMiddleware from './socket/middleware';

const rootReducer = combineReducers({
  socketState: socketReducer,
  messageState: messageReducer
});


const store = configureStore({
  reducer: rootReducer,
  middleware: () => new Tuple(socketMiddleware, logger)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;