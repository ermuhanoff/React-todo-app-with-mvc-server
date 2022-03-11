import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  getTaskNameById,
  getTaskDescriptionById,
  getTaskIsDoneById,
} from '../../store/tasks/Selectors';
import { editTaskThunk } from '../../store/tasks/Actions';
import { constants } from './constants';
import { useInput, useCheckbox } from '../../hooks/hooks';

export const TaskEditPage = () => {
  const { taskId, categoryId } = useParams();
  const taskName = useSelector((state) => getTaskNameById(state, taskId));
  const taskDescription = useSelector((state) => getTaskDescriptionById(state, taskId));
  const taskIsDone = useSelector((state) => getTaskIsDoneById(state, taskId));
  const dispatch = useDispatch();

  const [taskNameValue, setTaskNameValue] = useInput(taskName);
  const [taskDescriptionValue, setTaskDescriptionValue] = useInput(taskDescription);
  const [taskIsDoneValue, setTaskIsDoneValue] = useCheckbox(taskIsDone);

  const navigate = useNavigate();

  const onCancelClickHandler = () => navigate(-1);

  const onSaveClickHandler = () => dispatch(
    editTaskThunk(categoryId, taskId, {
      name: taskNameValue,
      description: taskDescriptionValue,
      isDone: taskIsDoneValue,
    }),
  );

  return (
    <form className='container-fluid'>
      <div className='mb-3'>
        <label className='form-label w-100'>
          {constants.labelTaskNameText}
          <input
            type='text'
            className='form-control mt-2'
            value={taskNameValue}
            placeholder={constants.inputTaskNamePlaceholder}
            onChange={setTaskNameValue}
          />
        </label>
      </div>
      <div className='form-check mb-3'>
        <label className='form-check-label'>
          {constants.labelCheckboxText}
          <input
            type='checkbox'
            className='form-check-input'
            checked={taskIsDoneValue}
            onChange={setTaskIsDoneValue}
          />
        </label>
      </div>
      <div className='mb-3'>
        <label className='form-label w-100'>
          {constants.labelTaskDescriptionText}
          <textarea
            className='form-control mt-2'
            rows='10'
            value={taskDescriptionValue}
            placeholder={constants.inputTaskDescriptionPlaceholder}
            onChange={setTaskDescriptionValue}
          />
        </label>
      </div>
      <div className='mb-3 d-flex justify-content-end'>
        <button
          className='btn btn-outline-primary me-3'
          type='button'
          onClick={onSaveClickHandler}
        >
          {constants.buttonSave}
        </button>
        <button
          className='btn btn-outline-danger'
          type='button'
          onClick={onCancelClickHandler}
        >
          {constants.buttonCancel}
        </button>
      </div>
    </form>
  );
};
