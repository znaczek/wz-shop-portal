import React, {useCallback, useMemo} from 'react';
import {ProductRepositories} from '../../products-repositories';
import {RouteComponentProps, useHistory} from 'react-router-dom';
import {ProductBrowser} from './product-browser/product-browser';
import {ListUtils} from '../../../../common/utils/list.utils';
import {PaginatorProps} from '../../../../common/components/paginator/paginator';
import {Pagination} from '../../../../common/interface/pagination';
import {Direction} from '../../../../common/enum/direction';
import {Sort} from '../../../../common/interface/sort';

interface Params {
  category: string;
}
export const ProductsBrowserContainer: React.FC<RouteComponentProps<Params>> = ({location, match}) => {
  const history = useHistory();
  const query = ListUtils.parseUrlQuery(location.search);
  const {page, size, sortKey, dir} = query;
  const category = match.params.category;

  const [c] = ProductRepositories.categories.useEffect();

  const [products] = ProductRepositories.list.useEffect({
    query: ListUtils.parseUrlQuery(location.search),
    category
  });
  const total = (products.data && products.data.total) || 0;
  const [categories] = ProductRepositories.productCategories.useEffect({
    category
  });

  const onPaginate = useCallback((pagination: Pagination) => {
    history.replace(ListUtils.getQueryString({
      ...query,
      page: pagination.page,
      size: pagination.size,
    }));
  }, [history, query, page, size]);

  const onSort = useCallback((sort: Sort) => {
    history.replace(ListUtils.getQueryString({
      ...query,
      sortKey: sort.sortKey,
      dir: sort.dir,
    }));
  }, [history, query]);

  const paginatorProps = useMemo((): PaginatorProps => {
    return {
      page,
      total,
      size,
      getLink: (index: number) => ListUtils.getQueryString({
        ...query,
        page: index,
      }),
      onPaginate
    };
  }, [page, size, total, query, onPaginate]);

  return (
      <ProductBrowser
        products={products}
        categories={categories}
        pagination={paginatorProps}
        sort={{
          sortKey: sortKey || 'createdBy',
          dir: dir || Direction.DESC,
        }}
        onSortChange={onSort}
      />
  );
};
