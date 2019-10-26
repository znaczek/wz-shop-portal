import React, {useCallback} from 'react';
import {ProductRepositories} from '../../products-repositories';
import {RouteComponentProps, useHistory} from 'react-router-dom';
import {ProductsList} from './products-list/products-list';

export const ProductsListContainer: React.FC<RouteComponentProps> = ({location}) => {

  const history = useHistory();
  const [products, {start}] = ProductRepositories.list.useEffect({
    url: `api/v1/products?first=${location.search}`,
  });

  const handleClick = useCallback(() => history.push(`/products?query=${new Date().getTime()}`), [
    history
  ]);
  const handleClickAgain = useCallback(
    () => start({url: `api//v1/products?again${new Date().getTime()}`}),
    [start]
  );

  console.log('RENDER');
  return (
    <React.Fragment>
      <ProductsList products={products}/>
      <button onClick={handleClick}>Click me!</button>
      <button onClick={handleClickAgain}>Click me once again!</button>
    </React.Fragment>
  );
};
