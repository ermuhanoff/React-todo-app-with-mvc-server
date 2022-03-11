import React, { useState } from 'react';

import './scss/InputWithButton.scss';

export const InputWithButton = (props) => {
  const {
    isDisabled,
    buttonType,
    buttonText,
    placeholder,
    isOutline = true,
    onButtonClick,
    removeOnClick = true,
    width = '100%',
  } = props;

  const [value, setValue] = useState('');

  const outlineClass = isOutline ? 'outline-' : '';

  const onChangeHandler = (event) => setValue(event.target.value);
  const onButtonClickHandler = () => {
    onButtonClick(value);
    if (removeOnClick) setValue('');
  };

  return (
    <div className='input-with-button input-group' style={{ width: width }}>
      <input
        type='text'
        className='form-control'
        placeholder={placeholder}
        aria-label={placeholder}
        value={value}
        onChange={onChangeHandler}
        disabled={isDisabled}
      />
      <button
        className={`btn btn-${outlineClass}${buttonType}`}
        type='button'
        onClick={onButtonClickHandler}
        disabled={isDisabled}
      >
        {buttonText}
      </button>
    </div>
  );
};
