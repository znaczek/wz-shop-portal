import {ProductsList} from './products-list/products-list';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

export const ProductsListContainer = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/v1/products');
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    // @ts-ignore
    <ProductsList products={data}/>
  );
};
