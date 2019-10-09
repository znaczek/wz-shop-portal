import * as React from 'react';
import styles from './content.module.scss';
import {Route, Switch} from 'react-router-dom';
import {DashboardContainer} from '../dashboard-container/dashboard-container';
import {ProductsListContainer} from '../../../modules/product/containers/products-list-container/products-list-container';

export const Content = () => {
    return (
        <div className={styles.content}>
            <Switch>
                <Route path='/' component={DashboardContainer} exact={true}/>
                <Route path='/products' component={ProductsListContainer}/>
            </Switch>
        </div>
    );
};

