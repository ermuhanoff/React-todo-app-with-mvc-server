import React, { useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { LoadingSpinner } from '../loadingSpinner';
import { CategoriesView } from '../categoriesView';
import { getCategoriesThunk } from '../../store/categories/Actions';
import {
  getCategoriesRootIds,
  getIsFetchingState,
} from '../../store/categories/Selectors';
import './scss/Categories.scss';

export const Categories = memo(() => {
  const categoriesIds = useSelector(getCategoriesRootIds);
  const isFetching = useSelector(getIsFetchingState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  if (searchParams.get('err') === 'no_url') {
    navigate('/');
  }

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [getCategoriesThunk]);

  return (
    <div className='categories'>
      {isFetching ? <LoadingSpinner /> : <CategoriesView categoriesIds={categoriesIds} />}
    </div>
  );
});
