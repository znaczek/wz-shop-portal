export interface CategoryModel {
  id: string;
  name: string;
  slug: string;
  children: CategoryModel[];
  parent: string;
}
