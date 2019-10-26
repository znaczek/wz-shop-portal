import {Pagination} from './pagination';
import {Sort} from './sort';
import {Direction} from '../enum/direction';
import {Nullable} from './nullable';

export class PageQuery implements Nullable<Pagination>, Nullable<Sort>  {
  page: number | null = null;
  size: number | null = null;
  dir: Direction | null = null;
  sortKey: string | null = null;
  filters: {[key: string]: string} = {};
  search: string | null = null;

  constructor(options?: Partial<PageQuery>) {
    Object.assign(this, options);
  }
}
