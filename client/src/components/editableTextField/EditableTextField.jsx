import React from 'react';

export const EditableTextField = ({ value, isEditable, onClick }) => isEditable
  ? <input type='text' value={value} />
  : <button className='btn p-0' type='button' onClick={onClick}>{value}</button>;
