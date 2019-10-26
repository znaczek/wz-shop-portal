import {PagedResult} from '../common/repository/paged-result.interace';
import {ApiData} from '../common/repository/api-data.interface';
import {ProductModel} from '../modules/product/model/produt.model';

export interface ApplicationState {
  products: ApiData<PagedResult<ProductModel>>;
}
