export const getReducerMapping = (reducerMapping, initialState) => (
  (state = initialState, action) => reducerMapping[action.type]
    ? reducerMapping[action.type](state, action.payload)
    : state
);
