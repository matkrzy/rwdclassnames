import { useState, useEffect } from 'react';

import { useWidth } from './useWidth.hook';

//regex to detect condition and breakpoint
const regex = /([>=<!])(\d*)/;

//rules map
const rulesMap = {
  '>': ({ width, breakpoint }) => width > breakpoint,
  '>=': ({ width, breakpoint }) => width >= breakpoint,
  '<': ({ width, breakpoint }) => width < breakpoint,
  '<=': ({ width, breakpoint }) => width <= breakpoint,
};

export const useRwdClassNames = params => {
  //check if params exist
  if (!params) {
    throw new Error('Params are required');
  }

  const { rules = {}, debounceTime } = params;

  //check if rules are present
  if (!Object.keys(rules).length) {
    throw new Error('Rules are required');
  }

  const { width, elementRef } = useWidth(debounceTime);
  const [classNames, setClassNames] = useState('');

  //update classnames when width has changed
  useEffect(() => {
    const newClassNames = [];
    Object.entries(rules).forEach(([key, value]) => {
      const [, condition, breakpoint] = key.match(regex);

      if (!rulesMap[condition]) {
        throw new Error('invalid condition parameter');
      }

      if (rulesMap[condition]({ width, breakpoint })) {
        newClassNames.push(value);
      }
    });

    if (classNames !== newClassNames.join(' ')) {
      setClassNames(newClassNames.join(' '));
    }
  }, [width]);

  return { classNames, elementRef, width };
};
