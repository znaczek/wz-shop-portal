import * as React from 'react';
import styles from './top-bar.module.scss';
import {SearchBar} from './search-bar/search-bar';
import {Menu} from './menu/menu';
import {Link} from 'react-router-dom';

export const TopBar = () => {
    return (
        <div className={styles.topBar}>
            <nav>
                <Link to='/'>BRAND</Link>
            </nav>
            <SearchBar/>
            <Menu/>
        </div>
    );
};
