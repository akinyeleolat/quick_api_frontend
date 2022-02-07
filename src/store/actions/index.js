import {FETCH_USERS, DELETE_USER, ADD_USER, UPDATE_USER, FETCH_USER} from "../types";
import instance from '../../utils/config'



export const fetchUsers = users => ({
    type: FETCH_USERS,
    payload: users,
});

export const fetchUser = user => ({
    type: FETCH_USER,
    payload: user,
});

export const deleteUser = id => ({
    type: DELETE_USER,
    payload: id,
});

export const addUser = user => {
    return {
      type: ADD_USER,
      payload: user
    };
};

export const editUser = user => {
    return {
      type: UPDATE_USER,
      payload: user
    };
  };


export const getAllUser = () => {
    return async dispatch => {
      const res = await instance.get('/getuser');
      dispatch(fetchUsers(res.data.data));
    };
};

export const getUser = id => {
    return async dispatch => {
      const res = await instance.get(`getuser/${id}`);
      console.log('retrieved data', res.data.data)
      dispatch(fetchUser(res.data.data));
    };
};

export const removeUser = id => {
    return async dispatch => {
      const res = await instance.delete(`delete/${id}`);
      dispatch(deleteUser(res.data.data));
    };
};

export const createUser = data => {
    return async dispatch => {
      const res = await instance.post('create', data);
      dispatch(addUser(res.data.data));
    };
};

export const updateUser = (data, id) => {
    return async dispatch => {
      const res = await instance.patch(`update/${id}`, data);
      dispatch(editUser(res.data.data));
    };
  };