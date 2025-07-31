import { useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../components/posts/postSlice/PostSlice';

export const usePosts = () => {
  const { items, loading, skip, hasMore } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const observer = useRef();

  useEffect(() => {
    dispatch(fetchPosts(0));
  }, [dispatch]);

  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(fetchPosts(skip));
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, skip, dispatch]
  );

  return { items, loading, lastPostRef };
};
