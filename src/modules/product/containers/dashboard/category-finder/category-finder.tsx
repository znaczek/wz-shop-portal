import React, {FC} from 'react';
import {CategoryModel} from '../../../model/category.model';
import {Link} from 'react-router-dom';
import styles from './category-finder.module.scss';

interface Props {
  categories: CategoryModel[] | null;
}

export const CategoryFinder: FC<Props> = (props: Props) => {
  const {categories} = props;

  return (
    <ul className={styles.list}>
      {categories && categories.map((category) => (
        <li key={category.slug}>
          <Link to={`/category/${category.slug}`}>{category.name}</Link>
          {category.children.length > 0 && <CategoryFinder categories={category.children}/>}
        </li>
      ))}
    </ul>
  );
};
