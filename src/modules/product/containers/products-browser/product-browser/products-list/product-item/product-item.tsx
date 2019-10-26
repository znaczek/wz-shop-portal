import React, {FC} from 'react';
import {ProductModel} from '../../../../../model/produt.model';
import {Price} from '../../../../../../../common/components/price/price';

interface Props {
  product: ProductModel;
}

export const ProductItem: FC<Props> = (props: Props) => {
  const {product} = props;

  return (
    <div>
      <h3>{product.name}</h3>
      <p>{product.category.slug}</p>
      <p>{product.description}</p>
      <p><Price value={product.price}/></p>
    </div>
  );
};
