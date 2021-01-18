import * as actionTypes from '../actions/actionTypes';
var initialState = {
  toDO: [],
  bucket : []
}
export default (state = initialState, action) => {
    switch (action.type){
      case actionTypes.REMOVE_TODO:
        return {
          ...state,  bucket:JSON.parse(JSON.stringify(action.bucket))
        }
      case actionTypes.EDIT_TODO:
      return {
        ...state, ucket:action.bucket
      };
      case actionTypes.CREATE_NEW_BUCKET:
      return {
        ...state, bucket:action.bucket
      }
      case actionTypes.CREATE_NEW_TODO:
      return {
        ...state, bucket:action.bucket
      }
      case actionTypes.EDIT_BUCKET:
      return {
        ...state,  bucket:action.bucket
      }
      default:
            return state;
    }
  };