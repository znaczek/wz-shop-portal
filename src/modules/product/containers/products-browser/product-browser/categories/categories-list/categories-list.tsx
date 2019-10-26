import React, {FC} from 'react';
import {CategoryModel} from '../../../../../model/category.model';
import {Link} from 'react-router-dom';

interface Props {
  categories: CategoryModel[];
}

export const CategoriesList: FC<Props> = ({categories}) => {
  return (
    <ul>
      {categories.map((category) => (
        <li key={category.slug}>
          <Link to={category.slug}>{category.name}</Link>
        </li>
      ))}
    </ul>
  );
};
