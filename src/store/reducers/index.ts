import {combineReducers, Reducer} from 'redux';
import {ApplicationState} from '../application-state.interface';
import {ProductRepositories} from '../../modules/product/products-repositories';
import {ActionInterface} from '../../common/interface/action.interface';

export default function createRootReducer(): Reducer<ApplicationState, ActionInterface<any>> {
  return combineReducers({
    categories: ProductRepositories.categories.reducer,
    products: ProductRepositories.list.reducer,
    productsCategories: ProductRepositories.productCategories.reducer,
  });
}
