import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPostsApi } from '../../../api/api';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (skip, { rejectWithValue }) => {
    try {
      const data = await fetchPostsApi(skip);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    loading: false,
    error: null,
    skip: 0,
    hasMore: true,
  },
  reducers: {
    toggleReaction: (state, { payload }) => {
      const { postId, reactionType } = payload;
      const post = state.items.find((p) => p.id === postId);
      if (!post) return;

      if (!post.userReaction) {
        post.userReaction = reactionType;
        post.reactions[reactionType + 's'] += 1;
      } else if (post.userReaction === reactionType) {
        post.reactions[reactionType + 's'] -= 1;
        post.userReaction = null;
      } else {
        post.reactions[post.userReaction + 's'] -= 1;
        post.reactions[reactionType + 's'] += 1;
        post.userReaction = reactionType;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        state.loading = false;
        const newPosts = payload.posts.map((post) => ({
          ...post,
          userReaction: null,
        }));
        state.items.push(...newPosts);
        state.skip += 10;
        if (state.items.length >= payload.total) {
          state.hasMore = false;
        }
      })
      .addCase(fetchPosts.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { toggleReaction } = postsSlice.actions;
export default postsSlice.reducer;
