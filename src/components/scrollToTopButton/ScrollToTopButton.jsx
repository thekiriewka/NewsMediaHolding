import { useEffect, useState } from 'react';
import { Button } from 'antd';
import { UpOutlined } from '@ant-design/icons';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return visible ? (
    <Button
      type="primary"
      shape="circle"
      icon={<UpOutlined />}
      onClick={handleClick}
      style={{
        position: 'fixed',
        bottom: 40,
        right: 40,
        zIndex: 1000,
      }}
    />
  ) : null;
};

export default ScrollToTopButton;
