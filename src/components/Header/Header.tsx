import React from 'react';

import styles from './Header.module.scss';

interface HeaderProps {
  title: string;
  buttons: React.ReactNode[];
}

export const Header: React.FC<HeaderProps> = ({ title, buttons }) => {
  return (
    <header className={styles['header']}>
      <h2>{title}</h2>
      {buttons.map((content, index) => (
        <button key={index}>{content}</button>
      ))}
    </header>
  );
};
