import {PageQuery} from '../interface/page-query';
import qs from 'qs';

export class ListUtils {

  public static hasRequiredParams(query: Partial<PageQuery>): boolean {
    return !!query.page && !!query.size;
  }

  public static parseUrlQuery(urlSearch: string): PageQuery {
    const query = qs.parse(urlSearch, { ignoreQueryPrefix: true });
    const page = parseInt(query.page, 10);
    const size = parseInt(query.size, 10);
    const [sortKey, dir] = (query.sort || ',').split(',');

    return {
      page: (page === 0 || !isNaN(page)) ? page : null,
      size: (size === 0 || !isNaN(size)) ? size : null,
      sortKey: sortKey ? sortKey : null,
      dir: dir ? dir : null,
      filters: query.filters,
      search: query.search,
    };
  }

  public static getQueryString(query: Partial<PageQuery>, defaultTotal = 10): string {
    const parts: any = {};

    parts.page = (query.page === 1 || query.page) ? query.page : 0;
    parts.size = query.size || defaultTotal;

    if (query.sortKey && query.dir) {
      parts.sort = `${query.sortKey},${query.dir}`;
    }
    if (query.filters) {
      for (const filterKey of Object.keys(query.filters)) {
        parts[filterKey] = query.filters[filterKey];
      }
    }

    const queryString = qs.stringify(parts, { addQueryPrefix: true });
    return queryString ? queryString : '';
  }

}
