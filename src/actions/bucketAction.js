import * as actionTypes from './actionTypes';

export const createTodo = (toDo) => {
    return {
      type: actionTypes.CREATE_NEW_TODO,
      bucket: toDo
    }
  };

  export const createBucket = (bucket) => {
    return {
      type: actionTypes.CREATE_NEW_BUCKET,
      bucket: bucket
    }
  };

  export const editBucket = (bucket) => {
    return {
      type: actionTypes.EDIT_BUCKET,
      bucket: bucket
    }
  };

  export const editTodo = (toDo) => {
    return {
      type: actionTypes.EDIT_TODO,
      bucket: toDo
    }
  };

export const deleteTodo = (bucket,index , bucketIndex) => {
  return {
    type: actionTypes.REMOVE_TODO,
    bucket: bucket,
    todoId: index,
    bucketIndex: bucketIndex
  }
}