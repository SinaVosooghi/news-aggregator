import NoTFoundImage from '@src/assets/not-found.jpeg';

import styles from './NotFound.module.scss'; // Import stylesheet

export const NotFound = () => {
  return (
    <div className={styles['not-found']}>
      <img src={NoTFoundImage} alt="Not Found" />
    </div>
  );
};
