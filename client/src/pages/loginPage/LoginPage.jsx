import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useInput } from '../../hooks/hooks';
import { login } from '../../api/userApi';
import { openErrorAlertThunk } from '../../store/alerts/Actions';

export const LoginPage = () => {
  const [emailValue, setEmailValue] = useInput();
  const [passwordValue, setPasswordValue] = useInput();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLoginClick = async (event) => {
    event.preventDefault();

    login(emailValue, passwordValue)
      .then(() => navigate('/', { replace: true }))
      .catch((err) => {
        dispatch(openErrorAlertThunk(err));
      });
  };

  return (
    <div className='container vw-100 vh-100 d-flex justify-content-center align-items-center'>
      <form>
        <div className='mb-3'>
          <label htmlFor='exampleInputEmail1' className='form-label'>
            Email address
          </label>
          <input
            type='email'
            className='form-control'
            value={emailValue}
            onChange={setEmailValue}
            autoFocus
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputPassword1' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            value={passwordValue}
            onChange={setPasswordValue}
          />
        </div>
        <button
          type='submit'
          className='btn btn-primary'
          onClick={onLoginClick}
        >
          Login
        </button>
      </form>
    </div>
  );
};
