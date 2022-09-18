import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import styles from './index.module.scss';
export default function Admin() {
  return (
    <div>
      <h1>Admin</h1>
      <div className={styles.nav}>
        <Link to='/home'>Home</Link>
        <Link to='/rights'>rights</Link>
        <Link to='/test'>测试</Link>
      </div>

      <Outlet></Outlet>
    </div>
  );
}
