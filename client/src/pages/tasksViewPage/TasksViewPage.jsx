import React, { useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';

import { LoadingSpinner } from '../../components/loadingSpinner';
import { TaskView } from '../../components/tasksView';
import { getFilteredTasks, getIsFetchingState } from '../../store/tasks/Selectors';
import { getTasksThunk } from '../../store/tasks/Actions';

export const TasksViewPage = memo(() => {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const tasksIds = useSelector((state) => getFilteredTasks(
    state,
    categoryId,
    searchParams.get('isDone') || false,
    searchParams.get('filter') || '',
  ));
  const isFetching = useSelector(getIsFetchingState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasksThunk(categoryId));
  }, [getTasksThunk, categoryId]);

  return (
    <div className='tasks container-fluid list-group'>
      {isFetching
        ? <LoadingSpinner />
        : <TaskView tasksIds={tasksIds} categoryId={categoryId} />}
    </div>
  );
});
