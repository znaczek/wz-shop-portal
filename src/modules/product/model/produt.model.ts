import {CreationDetails} from '../../../common/model/creation-details';

export interface ProductModel extends CreationDetails {
  id: string;
  name: string;
  price: number;
  description: string;
  category: {
    slug: string,
  };
}
