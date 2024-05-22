import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const idLink = location.pathname.split('/')[1];

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <>
            <BurgerIcon type={'primary'} />
            <Link
              to='/'
              className={`text text_type_main-default ml-2 mr-10 ${styles.link} ${idLink === '' ? styles.link_active : ''}`}
            >
              Конструктор
            </Link>
          </>
          <>
            <ListIcon type={'primary'} />
            <Link
              to='/feed'
              className={`text text_type_main-default ml-2 ${styles.link} ${idLink === 'feed' ? styles.link_active : ''}`}
            >
              Лента заказов
            </Link>
          </>
        </div>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
        <div className={styles.link_position_last}>
          <ProfileIcon type={'primary'} />
          <Link
            to='/profile'
            className={`text text_type_main-default ml-2 ${styles.link} ${idLink === 'profile' ? styles.link_active : ''}`}
          >
            {userName || 'Личный кабинет'}
          </Link>
        </div>
      </nav>
    </header>
  );
};
