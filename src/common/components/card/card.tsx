import React, {FC} from 'react';
import styles from './card.module.scss';
import {ChildrenProps} from '../../interface/children-props';

export const Card: FC<ChildrenProps> = (props: ChildrenProps) => {
  return (
    <div className={styles.card}>
      {props.children}
    </div>
  );
};
