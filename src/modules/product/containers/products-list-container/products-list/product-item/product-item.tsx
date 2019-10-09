import React, {FC} from 'react';
import {ProductModel} from '../../../../model/produt.model';

interface Props {
  product: ProductModel;
}

export const ProductItem: FC<Props> = (props: Props) => {
  const {product} = props;

  return (
    <div>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
    </div>
  );
};
