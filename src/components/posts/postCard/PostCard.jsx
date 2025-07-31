import { Card, Tag, Typography, Tooltip } from 'antd';
import {
  LikeOutlined,
  LikeFilled,
  DislikeOutlined,
  DislikeFilled,
  EyeOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { toggleReaction } from '../postSlice/PostSlice';

const { Paragraph, Title } = Typography;

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const isLiked = post.userReaction === 'like';
  const isDisliked = post.userReaction === 'dislike';

  const handleReaction = (type) => {
    dispatch(toggleReaction({ postId: post.id, reactionType: type }));
  };

  return (
    <Card style={{ marginBottom: 16 }}>
      <Title level={4}>{post.title}</Title>
      <Paragraph ellipsis={{ rows: 3 }}>{post.body}</Paragraph>
      <div style={{ marginBottom: 8 }}>
        {post.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <Tooltip title="Нравится">
          <span
            onClick={() => handleReaction('like')}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              color: isLiked ? '#1890ff' : 'inherit',
            }}>
            {isLiked ? <LikeFilled /> : <LikeOutlined />}
            <span style={{ marginLeft: 4 }}>{post.reactions.likes}</span>
          </span>
        </Tooltip>

        <Tooltip title="Не нравится">
          <span
            onClick={() => handleReaction('dislike')}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              color: isDisliked ? '#ff4d4f' : 'inherit',
            }}>
            {isDisliked ? <DislikeFilled /> : <DislikeOutlined />}
            <span style={{ marginLeft: 4 }}>{post.reactions.dislikes}</span>
          </span>
        </Tooltip>

        <div style={{ marginLeft: 'auto' }}>
          <Tooltip title="Просмотров">
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                color: '#888',
              }}>
              <EyeOutlined />
              <span style={{ marginLeft: 4 }}>{post.views}</span>
            </span>
          </Tooltip>
        </div>
      </div>
    </Card>
  );
};

export default PostCard;
