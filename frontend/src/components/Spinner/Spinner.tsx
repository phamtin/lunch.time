import { memo } from 'react';

import './spinner.css';

interface Props {
  size?: 'small' | 'medium';
}

const Spinner = ({ size = 'medium' }: Props) => {
  return (
    <div className="wrapper">
      <span className={`${size === 'medium' ? 'md' : 'sm'} loader`} />
    </div>
  );
};

export default memo(Spinner);
