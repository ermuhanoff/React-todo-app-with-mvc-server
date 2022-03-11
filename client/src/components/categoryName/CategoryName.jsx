import React from 'react';
import { NavLink } from 'react-router-dom';

import './scss/CategoryName.scss';

export const CategoryName = (props) => {
  const {
    name,
    collapsedClass,
    path,
    onNameClick,
    onRemoveHandler,
    onAddNestedHandler,
    onUpdateHandler,
    onChangeCategoryHandler,
    isTaskEdited,
  } = props;
  const activeNavLinkClass = ' link-success fw-bold text-decoration-underline';
  const navLinkClass = 'btn category-name-content ' + collapsedClass;

  const isActiveNavLink = ({ isActive }) => isActive
    ? navLinkClass + activeNavLinkClass
    : navLinkClass + ' link-primary';

  return (
    <div className='category-name'>
      {path ? (
        <NavLink to={path} className={isActiveNavLink}>
          {name}
        </NavLink>
      ) : (
        <button className={navLinkClass} type='button' onClick={onNameClick}>
          {name}
        </button>
      )}
      <button
        type='button'
        className='category-edit btn btn-outline-secondary me-2 h-50 p-1'
        onClick={onUpdateHandler}
      >
        <i className='bi bi-pencil' />
      </button>
      <button
        type='button'
        className='category-edit btn btn-outline-danger me-3 h-50 p-1'
        onClick={onRemoveHandler}
      >
        <i className='bi bi-trash' />
      </button>
      <button
        type='button'
        className='category-edit btn btn-outline-secondary h-50 p-0 fs-6'
        onClick={onAddNestedHandler}
      >
        <i className='bi bi-plus' />
      </button>
      {(isTaskEdited && path) && (
        <button
          type='button'
          className='category-edit btn btn-outline-secondary h-50 ms-3 p-0 fs-6'
          onClick={onChangeCategoryHandler}
        >
          <i className='bi bi-arrow-return-left' />
        </button>
      )}
    </div>
  );
};
