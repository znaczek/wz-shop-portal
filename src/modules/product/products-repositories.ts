import {ProductModel} from './model/produt.model';
import {ListRepository} from '../../common/repository/list-repository';

interface ProductsPayload {
  url: string;
}
export const ProductRepositories = {
  list: new ListRepository<ProductModel, ProductsPayload>(
    '[Products list] get list',
    (payload) => ({url: payload.url}),
    (state) => state.products,
  ),
};
