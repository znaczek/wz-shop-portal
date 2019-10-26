import React, {FC} from 'react';
import {ProductItem} from './product-item/product-item';
import {ApiData} from '../../../../../../common/repository/api-data.interface';
import {PagedResult} from '../../../../../../common/repository/paged-result.interace';
import {ProductModel} from '../../../../model/produt.model';
import {Card} from '../../../../../../common/components/card/card';
import {Paginator, PaginatorProps} from '../../../../../../common/components/paginator/paginator';
import styles from './products-list.module.scss';
import {Sort} from '../../../../../../common/interface/sort';
import {Direction} from '../../../../../../common/enum/direction';
import {OptionInterface} from '../../../../../../common/interface/option.interface';
import Select from 'react-select';
import {isEqual} from 'lodash';

interface Props {
  products: ApiData<PagedResult<ProductModel>>;
  pagination: PaginatorProps;
  sort: Sort;
  onSortChange: (sort: Sort) => void;
}

const options: Array<OptionInterface<Sort>> = [
  {value: {sortKey: 'price', dir: Direction.ASC}, label: 'by price, ascending'},
  {value: {sortKey: 'price', dir: Direction.DESC}, label: 'by price, descending'},
];

export const ProductsList: FC<Props> = (props: Props) => {
  const {products, pagination, sort, onSortChange} = props;

  const value = options.find((option) => {
    return isEqual(option.value, {
      sortKey: sort.sortKey,
      dir: sort.dir,
    });
  });

  // TODO translations
  return (
    <Card>
      <div className={styles.topBar}>
        <div className={styles.sortWrapper}>
          <Select
            className={styles.sort}
            classNamePrefix='react-select'
            options={options}
            onChange={(event) => onSortChange((event as OptionInterface<Sort>).value)}
            value={value}
          />
        </div>
        <Paginator {...pagination}/>
      </div>
      <ul>
        {products.data && products.data.list.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
          />
        ))}
      </ul>
    </Card>
  );
};
