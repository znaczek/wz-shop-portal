import React, {FC} from 'react';
import {Card} from '../../../../../../common/components/card/card';
import {ApiData} from '../../../../../../common/repository/api-data.interface';
import {CategoryModel} from '../../../../model/category.model';
import {Link} from 'react-router-dom';
import {CategoriesList} from './categories-list/categories-list';

interface Props {
    categories: ApiData<CategoryModel[]>;
}

export const Categories: FC<Props> = ({categories: categoryData}) => {
    const category = categoryData.data && categoryData.data[0];
    console.log(category);
    return (
        <Card>
            <h2>Categories</h2>
            {category && (
                <React.Fragment>
                    <Link to={`${category.parent}`}>Back</Link>
                    <CategoriesList categories={category.children}/>
                </React.Fragment>
            )}
        </Card>
    );
};
