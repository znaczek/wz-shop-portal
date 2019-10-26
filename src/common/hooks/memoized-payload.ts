import {isEqual} from 'lodash';
import {useRef} from 'react';

export const useMemoizedPayload = <T>(payload: T): T => {

  const ref = useRef<T>();

  if (ref.current !== undefined && isEqual(payload, ref.current)) {
    return ref.current;
  } else {
    ref.current = payload;
    return payload;
  }
};
