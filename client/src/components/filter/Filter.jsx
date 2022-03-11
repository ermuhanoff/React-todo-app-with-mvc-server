import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { InputWithButton, buttonTypes } from '../inputWithButton';
import { constants } from './constatns';

export const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categoryId } = useParams();

  const isNotCategoryChosen = !categoryId;

  const onCheckboxHandler = (event) => {
    const filterValue = (searchParams.get('filter'));
    const isDoneValue = event.target.checked;
    const params = { };

    if (filterValue) params.filter = filterValue;
    if (isDoneValue) params.isDone = isDoneValue;

    setSearchParams(params);
  };

  const onSearchHandler = (value) => {
    const isDoneValue = (searchParams.get('isDone'));
    const params = { };

    if (isDoneValue) params.isDone = isDoneValue;
    if (value.trim()) params.filter = value;

    setSearchParams(params);
  };

  return (
    <div className='navbar-filter d-flex justify-content-between align-items-center'>
      <div className='form-check d-flex me-4'>
        <label className='form-check-label h-100'>
          <input
            type='checkbox'
            className='form-check-input'
            onChange={onCheckboxHandler}
            disabled={isNotCategoryChosen}
          />
          {constants.checkboxText}
        </label>
      </div>
      <InputWithButton
        isDisabled={isNotCategoryChosen}
        buttonType={buttonTypes.secondary}
        buttonText={constants.searchButtonText}
        placeholder={constants.searchInputPlaceholder}
        onButtonClick={onSearchHandler}
        removeOnClick={false}
        width='60%'
      />
    </div>
  );
};
