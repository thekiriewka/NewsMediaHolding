import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../components/posts/postSlice/PostSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});
