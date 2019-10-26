import * as React from 'react';
import {ProductRepositories} from '../../products-repositories';
import {Dashboard} from './dashboard';

export const DashboardContainer = () => {

  const [categories] = ProductRepositories.categories.useEffect();

  return (
    <Dashboard categories={categories}/>
  );
};
