import * as React from 'react';
import styles from './content.module.scss';
import {Route, Switch} from 'react-router-dom';
import {DashboardContainer} from '../../../modules/product/containers/dashboard/dashboard-container';
import {ProductsBrowserContainer} from '../../../modules/product/containers/products-browser/products-browser-container';

export const Content = () => {
    return (
        <div className={styles.content}>
            <Switch>
                <Route path='/' component={DashboardContainer} exact={true}/>
                <Route path='/category/:category' component={ProductsBrowserContainer}/>
            </Switch>
        </div>
    );
};

