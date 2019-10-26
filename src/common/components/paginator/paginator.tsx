import React, {FC, useCallback, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {HInputEvent} from '../../events/input-event';
import styles from './paginator.module.scss';
import Select from 'react-select';
import {SelectUtils} from '../../utils/select.utils';
import {OptionInterface} from '../../interface/option.interface';
import classNames from 'classnames';
import {Pagination} from '../../interface/pagination';
import {Nullable} from '../../interface/nullable';

export interface PaginatorProps extends Nullable<Pagination> {
  total?: number;
  sizeOption?: number[];
  getLink: (page: number) => string;
  onPaginate: (pagination: Pagination) => void;
}

export const Paginator: FC<PaginatorProps> = React.memo((props: PaginatorProps) => {
  const {
    total = 0,
    sizeOption = [10, 50, 100],
    onPaginate,
    getLink,
  } = props;
  const page = props.page || 1;
  const size = props.size || 10;
  const [index, setIndex] = useState(page);
  const [perPage, setPerPage] = useState(size);
  const max = Math.ceil(total / perPage);
  const options = SelectUtils.getOptionsFromArray(sizeOption);
  const canGoBack = index > 1;
  const canGoNext = index < max;

  useEffect(() => {
    setIndex(page);
  }, [page, setIndex]);

  useEffect(() => {
    setPerPage(size);
  }, [size, setPerPage]);

  const onCurrentChange = useCallback((event: HInputEvent) => {
    const eventValue = event.target.value;
    let value = parseInt(eventValue, 10);
    if ((value !== +eventValue) || value < 1) {
      return;
    }
    value = Math.min(value, max);
    setIndex(value);
  }, [setIndex, max]);

  const onBlur = useCallback((event: HInputEvent) => {
    onPaginate({
      page: parseInt(event.target.value, 10),
      size: perPage
    });
  }, [onPaginate, perPage]);

  const onSizeChange = useCallback((selectValue) => {
    const value = selectValue ? (selectValue as OptionInterface).value : null;
    onPaginate({
      page: index,
      size: value,
    });
    setPerPage(value);
  }, [onPaginate, setPerPage, index]);

  return (
    <div className={styles.paginator}>
      <Select
        value={options.find(({value}) => value === perPage)}
        options={SelectUtils.getOptionsFromArray(sizeOption)}
        classNamePrefix='react-select'
        isSearchable={false}
        onChange={onSizeChange}
      />
      <Link
        className={classNames(styles.arrow, {disabled: !canGoBack})}
        to={getLink(index - 1)}
        onClick={(e) => canGoBack ? setIndex(index - 1) : e.preventDefault()}
      >
        <span>&#8249;</span>
      </Link>
      <input
        className={styles.paginatorInput}
        type='number'
        value={index}
        onChange={onCurrentChange}
        onBlur={onBlur}
        min={1}
        max={max}
      /> of {max}
      <Link
        className={classNames(styles.arrow, {disabled: !canGoNext})}
        to={getLink(index + 1)}
        onClick={(e) => canGoNext ? setIndex(+index + 1) : e.preventDefault()}
      ><span>&#8250;</span>
      </Link>
    </div>
  );
});
