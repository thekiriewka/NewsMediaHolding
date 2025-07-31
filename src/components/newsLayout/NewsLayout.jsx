import { Layout, Typography } from 'antd';
import PostsList from '../posts/postList/PostList';
import ScrollToTopButton from '../scrollToTopButton/ScrollToTopButton';

const { Header, Content } = Layout;
const { Title } = Typography;

const layoutStyles = {
  wrapper: { minHeight: '100vh', width: '100%' },
  header: { color: 'white' },
  content: { padding: 24, maxWidth: 800, margin: '0 auto' },
};

const NewsLayout = () => (
  <Layout style={layoutStyles.wrapper}>
    <Header style={layoutStyles.header}>
      <Title
        level={3}
        style={{ color: 'white' }}>
        Лента новостей
      </Title>
    </Header>
    <Content style={layoutStyles.content}>
      <PostsList />
    </Content>
    <ScrollToTopButton />
  </Layout>
);

export default NewsLayout;
