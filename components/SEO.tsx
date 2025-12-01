import React, { useEffect } from 'react';
import { APP_NAME } from '../constants';

interface Props {
  title: string;
  description?: string;
}

const SEO: React.FC<Props> = ({ title, description }) => {
  useEffect(() => {
    document.title = `${title} | ${APP_NAME}`;
    if (description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', description);
      }
    }
  }, [title, description]);

  return null;
};

export default SEO;