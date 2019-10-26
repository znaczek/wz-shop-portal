import {ProductModel} from './model/produt.model';
import {ListRepository} from '../../common/repository/list-repository';
import {CategoryModel} from './model/category.model';
import {PageQuery} from '../../common/interface/page-query';
import {ListUtils} from '../../common/utils/list.utils';
import {ListPayload} from '../../common/repository/list-payload';
import {Repository} from '../../common/repository/repository';

type ProductsPayload = ListPayload & {
  query: Partial<PageQuery>;
  category: string;
};

interface ProductCategoriesPayload {
  category: string;
}

export const ProductRepositories = {
  categories: new Repository<CategoryModel[], void>(
    '[Categories] get list',
    () => ({url: `/api/v1/category`}),
    (state) => state.categories,
  ),
  list: new ListRepository<ProductModel, ProductsPayload>(
    '[Products] get list',
    ({query, category}) => ({url: `/api/v1/product${ListUtils.getQueryString(query)}&category=${category}`}),
    (state) => state.products,
  ),
  productCategories: new Repository<CategoryModel[], ProductCategoriesPayload>(
    '[Categories] get list for products',
    ({category}) => ({url: `/api/v1/category?category=${category}`}),
    (state) => state.productsCategories,
  ),
};
