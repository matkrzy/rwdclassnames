# rwdClassNames

Hook for react

### Example of usage
 ```js 
 const { classNames, elementRef } = useRwdClassNames({
    rules: { '>600': 'red' },
  });
  ```
When width of the `window` or `element` provided by `elementRef` is wider than 600px the `classNames` is `red`
otherwise it is empty string
