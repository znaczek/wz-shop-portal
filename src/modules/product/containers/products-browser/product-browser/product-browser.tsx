import React, {FC} from 'react';
import {ApiData} from '../../../../../common/repository/api-data.interface';
import {PagedResult} from '../../../../../common/repository/paged-result.interace';
import {ProductModel} from '../../../model/produt.model';
import {ProductsList} from './products-list/products-list';
import {Categories} from './categories/categories';
import styles from './product-browser.module.scss';
import {PaginatorProps} from '../../../../../common/components/paginator/paginator';
import {Sort} from '../../../../../common/interface/sort';
import {CategoryModel} from '../../../model/category.model';

interface Props {
  products: ApiData<PagedResult<ProductModel>>;
  categories: ApiData<CategoryModel[]>;
  pagination: PaginatorProps;
  sort: Sort;
  onSortChange: (value: Sort) => void;
}

export const ProductBrowser: FC<Props> = (props: Props) => {
  const {products, categories, pagination, sort, onSortChange} = props;

  return (
    <div className={styles.productsBrowser}>
      <Categories categories={categories}/>
      <ProductsList
        products={products}
        pagination={pagination}
        sort={sort}
        onSortChange={onSortChange}
      />
    </div>
  );
};
