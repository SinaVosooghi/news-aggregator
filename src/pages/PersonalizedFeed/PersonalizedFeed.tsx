import React from 'react';
import { Link } from 'react-router-dom';

import { PersonalizeFeedFrom } from '@src/components/PersonalizeFeedForm';
import { Header } from '@src/components/Header';

import styles from './PersonalizedFeed.module.scss';

export const PersonalizedFeed: React.FC = () => {
  return (
    <React.Fragment>
      <Header
        title="Customize News Feed"
        buttons={[<Link to="/">Jump to news feed</Link>]}
      />
      <div className={styles['personalized-feed-page']}>
        <PersonalizeFeedFrom />
      </div>
    </React.Fragment>
  );
};
