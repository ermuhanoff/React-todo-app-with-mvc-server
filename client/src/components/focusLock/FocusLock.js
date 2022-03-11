import React, { useEffect, useRef } from 'react';

import { useSelector } from 'react-redux';
import { getIsShowingState } from '../../store/modals/Selectors';

export const FocusLock = ({ children }) => {
  const isModalShowing = useSelector(getIsShowingState);
  const rootNode = useRef(null);

  useEffect(() => {
    if (rootNode.current) {
      rootNode.current.querySelectorAll('button, input, textarea, [href], select')
        .forEach((value) => {
          if (isModalShowing) {
            value.setAttribute('tabindex', '-1');
          } else {
            value.removeAttribute('tabindex');
          }
        });
    }
  }, [isModalShowing]);

  return <div ref={rootNode}>{children}</div>;
};
