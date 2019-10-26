import {PagedResult} from '../common/repository/paged-result.interace';
import {ApiData} from '../common/repository/api-data.interface';
import {ProductModel} from '../modules/product/model/produt.model';
import {CategoryModel} from '../modules/product/model/category.model';

export interface ApplicationState {
  categories: ApiData<CategoryModel[]>;
  products: ApiData<PagedResult<ProductModel>>;
  productsCategories: ApiData<CategoryModel[]>;
}
