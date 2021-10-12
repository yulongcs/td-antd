import { useEffect, useCallback } from 'react';

const DocumentHidden = ({ onChange = () => {}, ...rest }) => {
  const handleVisibilityChange = useCallback(() => {
    onChange(document.hidden);
  }, []);

  // 监听浏览器选项卡
  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    }
  }, []);

  return rest.children;
};

export default DocumentHidden;
