import React, {FC} from 'react';
import {CurrencyCode} from '../../enum/currency-code';
import {CurrencySuffix} from '../../model/currency-suffix';

interface Props {
  value: number;
  currency?: CurrencyCode;
}

export const Price: FC<Props> = ({value, currency = CurrencyCode.USD}: Props) => {
  return (
    <React.Fragment >
      {(value || 0) / 100} <span dangerouslySetInnerHTML={{__html: CurrencySuffix[currency]}}/>
    </React.Fragment>
  );
};
