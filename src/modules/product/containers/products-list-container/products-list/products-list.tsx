import React, {FC} from 'react';
import {ProductItem} from './product-item/product-item';
import {ProductModel} from '../../../model/produt.model';

interface Props {
  products: ProductModel[];
}

export const ProductsList: FC<Props> = (props: Props) => {
  const {products} = props;

  console.log(products);
  return (
    <main>
      <h1>Products list</h1>
      <ul>
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
          />
        ))}
      </ul>
    </main>
  );
};
