
import React from 'react';

interface Props {
  className?: string;
  width?: string | number;
  height?: string | number;
}

const Skeleton: React.FC<Props> = ({ className = '', width, height }) => {
  const style = {
    width: width,
    height: height,
  };

  return (
    <div 
      className={`bg-white/5 animate-pulse rounded ${className}`} 
      style={style}
    />
  );
};

export default Skeleton;
