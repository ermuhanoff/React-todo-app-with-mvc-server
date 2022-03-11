import React from 'react';
import './scss/NonExistentUrl.scss';

export const NonExistentUrl = () => {
  const className = 'container-fluid text-centered vw-100 vh-100 fs-1 fw-bolder text-secondary';
  return <div className={className}>Page not fount</div>;
};
