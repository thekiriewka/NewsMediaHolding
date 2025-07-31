import { List, Spin } from 'antd';
import PostCard from '../postCard/PostCard';
import { usePosts } from '../../../hooks/usePosts';

const PostsList = () => {
  const { items, loading, lastPostRef } = usePosts();

  return (
    <>
      <List
        dataSource={items}
        renderItem={(post, index) => (
          <div
            ref={index === items.length - 1 ? lastPostRef : null}
            key={post.id}>
            <PostCard post={post} />
          </div>
        )}
      />
      {loading && <Spin />}
    </>
  );
};

export default PostsList;
