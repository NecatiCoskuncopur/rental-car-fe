import React from 'react';

import CardLayout from './CardLayout';
import LeftAsideLayout from './LeftAsideLayout';
import RightAsideLayout from './RightAsideLayout';
import TableLayout from './TableLayout';

type OverlayLoaderProps = {
  variant: 'leftAside' | 'rightAside' | 'table' | 'card';
};

const OverlayLoader: React.FC<OverlayLoaderProps> = ({ variant }) => {
  return (
    <>
      {variant === 'leftAside' && <LeftAsideLayout />}
      {variant === 'rightAside' && <RightAsideLayout />}
      {variant === 'card' && <CardLayout />}
      {variant === 'table' && <TableLayout />}
    </>
  );
};

export default OverlayLoader;
