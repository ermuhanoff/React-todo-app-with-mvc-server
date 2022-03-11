import { useState } from 'react';

export const useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);

  const onChangeHandler = (event) => setValue(event.target.value);

  return [value, onChangeHandler];
};

export const useCheckbox = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const onChangeHandler = (event) => setValue(event.target.checked);

  return [value, onChangeHandler];
};
