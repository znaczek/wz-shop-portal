import React, {FC} from 'react';
import {ProductItem} from './product-item/product-item';
import {ProductModel} from '../../../model/produt.model';
import {ApiData} from '../../../../../common/repository/api-data.interface';
import {PagedResult} from '../../../../../common/repository/paged-result.interace';

interface Props {
  products: ApiData<PagedResult<ProductModel>>;
}

export const ProductsList: FC<Props> = (props: Props) => {
  const {products} = props;

  return (
    <main>
      <h1>Products list</h1>
      <ul>
        {products.data && products.data.list.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
          />
        ))}
      </ul>
    </main>
  );
};
