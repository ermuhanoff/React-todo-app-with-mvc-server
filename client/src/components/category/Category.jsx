import React, { useState, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import {
  getCategoryNameById,
  getCategoryChildrenById,
} from '../../store/categories/Selectors';
import {
  addNestedCategoryThunk,
  editCategoryThunk,
  removeCategoryThunk,
} from '../../store/categories/Actions';
import { taskChangeCategoryThunk } from '../../store/tasks/Actions';
import { closeModalAction, openModalAction } from '../../store/modals/Actions';
import { CategoryName } from '../categoryName';
import { modalTypes } from '../modal/modalTypes';
import './scss/Category.scss';

export const Category = memo(({ categoryId, map }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { taskId } = useParams();
  const navigate = useNavigate();

  const categoryName = useSelector((state) => getCategoryNameById(state, categoryId));
  const categoryChildren = useSelector((state) => getCategoryChildrenById(state, categoryId));
  const dispatch = useDispatch();

  const collapsedClass = !isCollapsed ? 'show' : '';

  const onClickHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsCollapsed(!isCollapsed);
  };

  const onRemoveHandler = () => {
    dispatch(
      openModalAction(modalTypes.CONFIRM_MODAL, {
        title: 'Delete this category?',
        action: () => {
          dispatch(removeCategoryThunk(categoryId));
          dispatch(closeModalAction());
          navigate('categories');
        },
        text: `Category "${categoryName}"`,
      }),
    );
  };

  const onAddNestedHandler = () => {
    dispatch(
      openModalAction(modalTypes.INPUT_MODAL, {
        title: 'Add nested category',
        action: (newCategoryName) => {
          dispatch(addNestedCategoryThunk(newCategoryName, categoryId));
          dispatch(closeModalAction());
        },
      }),
    );
  };

  const onUpdateHandler = () => {
    dispatch(
      openModalAction(modalTypes.INPUT_MODAL, {
        title: 'Rename category',
        action: (updatedCategoryName) => {
          dispatch(editCategoryThunk(categoryId, { name: updatedCategoryName }));
          dispatch(closeModalAction());
        },
      }),
    );
  };

  const onChangeCategoryHandler = () => {
    dispatch(taskChangeCategoryThunk(categoryId, taskId));
  };

  return (
    <div className='category mb-2'>
      <CategoryName
        name={categoryName}
        collapsedClass={collapsedClass}
        onNameClick={onClickHandler}
        onRemoveHandler={onRemoveHandler}
        onAddNestedHandler={onAddNestedHandler}
        onChangeCategoryHandler={onChangeCategoryHandler}
        onUpdateHandler={onUpdateHandler}
        path={!categoryChildren && `categories/${categoryId}`}
        isTaskEdited={taskId !== undefined}
      />
      {categoryChildren && (
        <div className={`category-collapse mt-2 ${collapsedClass}`}>
          {map(categoryChildren)}
        </div>
      )}
    </div>
  );
});
