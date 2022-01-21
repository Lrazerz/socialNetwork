import { FC } from 'react';
import spinnerSrc from './spinner.gif';

const Spinner: FC = () => {
  return (
    <>
      <img
        src={spinnerSrc as string}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt="Loading spinner"
      />
    </>
  );
};

export default Spinner;
