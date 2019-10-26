import React, {FC} from 'react';
import {ApiData} from '../../../../common/repository/api-data.interface';
import {CategoryModel} from '../../model/category.model';
import {CategoryFinder} from './category-finder/category-finder';

interface Props {
  categories: ApiData<CategoryModel[]>;
}

export const Dashboard: FC<Props> = (props: Props) => {
  const {categories} = props;

  return (
    <React.Fragment>
      <h1>Choose your category:</h1>
      <CategoryFinder categories={categories.data && categories.data}/>
    </React.Fragment>
  );
};
