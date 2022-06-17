// import React, { useState, useReducer, useContext } from 'react';
import React, { useReducer, useContext } from 'react'; //removed useState and using reducer
import axios from 'axios';
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_SEARCH_FILTERS,
  CHANGE_PAGE,
  GET_CUSTOMROWS_BEGIN,
  GET_CUSTOMROWS_SUCCESS,
  CLEAR_VALUES_ADD_CUSTOMROWS,
  CREATE_CUSTOMROW_BEGIN,
  CREATE_CUSTOMROW_SUCCESS,
  CREATE_CUSTOMROW_ERROR,
  GET_SINGLE_CUSTOMROW_BEGIN,
  GET_SINGLE_CUSTOMROW_SUCCESS,
  DELETE_CHANNEL_BEGIN,
  DISPLAY_ALERT_TEXT,
  CREATE_CHANNEL_BEGIN,
  CREATE_CHANNEL_SUCCESS,
  CREATE_CHANNEL_ERROR,
  DELETE_ROW_BEGIN,
  EDIT_CUSTOMROW_BEGIN,
  EDIT_CUSTOMROW_SUCCESS,
  EDIT_CUSTOMROW_ERROR,
} from './actions';
import reducer from './reducer';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userLocation = localStorage.getItem('location');

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || '',
  showSidebar: false,
  isEditing: false,
  editJobId: '',
  position: '',
  company: '',
  jobLocation: userLocation || '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
  customRows: [],
  totalCustomRows: 0,
  isCustomRowEditing: false,
  customRowTitle: '',
  selectedCustomRowObj: {},
  // channelOptions: [
  //   'unifi Sports 1',
  //   'unifi Sports 2',
  //   'unifi Sports 3',
  //   'unifi Sports 4',
  //   'unifi Sports 5',
  // ],
  channelsMapping: {
    54185493: 'unifi Sports 1',
    41210859: 'unifi Sports 2',
    52026408: 'unifi Sports 3',
    54199255: 'unifi Sports 4',
    41208891: 'unifi Sports 5',
  },
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // const [state, setState] = useState(initialState);
  const [state, dispatch] = useReducer(reducer, initialState);

  //global setup if we using the same Bearer token and api
  // axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;

  //global setup for specific Bearer token and api
  // const authFetch = axios.create({
  //   baseURL: '/api/v1',
  //   headers: {
  //     Authorization: `Bearer ${state.token}`,
  //   },
  // });

  //axios interceptor
  const authFetch = axios.create({
    baseURL: '/api/v1',
  });

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response);
      if (error.response.status === 401) {
        // console.log('AUTH ERROR');
        //logout user directly is unauthorized error occured
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  //reducer
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('location', location);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('location');
  };

  const registerUser = async (currentUser) => {
    // console.log('appContext.js file registerUser()');
    // console.log(currentUser);
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      // console.log('trycatch start on registerUser()');
      const response = await axios.post('/api/v1/auth/register', currentUser);
      console.log(response);
      const { user, token, location } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token, location },
      });
      //add to local storage
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      // console.log('trycatch error on registerUser()');
      console.log(error.response);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const loginUser = async (currentUser) => {
    // console.log(currentUser);
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await axios.post('/api/v1/auth/login', currentUser);
      const { user, token, location } = response.data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token, location },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const updateUser = async (currentUser) => {
    // console.log(currentUser);
    dispatch({ type: UPDATE_USER_BEGIN });

    try {
      //manual axios approach
      // const { data } = await axios.patch(
      //   '/api/v1/auth/updateUser',
      //   currentUser,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${state.token}`,
      //     },
      //   }
      // );

      //global axios approach
      const { data } = await authFetch.patch('/auth/updateUser', currentUser);
      // console.log(data);

      const { user, location, token } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      });
      addUserToLocalStorage({ user, location, token });
    } catch (error) {
      // console.log(error.response);
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    // console.log(`handleChange | ${name} | ${value}`);

    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = state;
      await authFetch.post('/jobs', {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });
      dispatch({ type: CREATE_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES }); //also can use 'clearValues()'
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getJobs = async () => {
    const { page, search, searchStatus, searchType, sort } = state;

    let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }

    dispatch({ type: GET_JOBS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { jobs, totalJobs, numOfPages } = data;
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      });
    } catch (error) {
      // console.log(error.response);
      logoutUser();
    }
    clearAlert();
  };

  const setEditJob = (id) => {
    console.log(`set edit job : ${id}`);
    dispatch({
      type: SET_EDIT_JOB,
      payload: {
        id,
      },
    });
  };

  const editJob = async () => {
    // console.log('edit job');
    dispatch({ type: EDIT_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = state;
      await authFetch.patch(`/jobs/${state.editJobId}`, {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });
      dispatch({ type: EDIT_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const deleteJob = async (jobId) => {
    // console.log(`delete job : ${jobId}`);
    dispatch({ type: DELETE_JOB_BEGIN });
    try {
      await authFetch.delete(`/jobs/${jobId}`);
      getJobs();
    } catch (error) {
      // console.log(error.response);
      logoutUser();
    }
  };

  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch('/jobs/stats');
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      // console.log(error.response);
      logoutUser();
    }
    clearAlert(); //optional. based on scenario masing2
  };

  const clearSearchFilter = () => {
    // console.log('clear filters');
    dispatch({ type: CLEAR_SEARCH_FILTERS });
  };

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
    console.log(`change page : ${page}`);
  };

  //get list of custom row
  const getCustomRows = async () => {
    let url = `/customPlayTVHomeRow`;

    dispatch({ type: GET_CUSTOMROWS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { customRows, totalCustomRows } = data;
      dispatch({
        type: GET_CUSTOMROWS_SUCCESS,
        payload: {
          customRows,
          totalCustomRows,
        },
      });
    } catch (error) {
      // console.log(error.response);
      logoutUser();
    }
    clearAlert();
  };

  const clearValues_Add_CustomRows = () => {
    dispatch({ type: CLEAR_VALUES_ADD_CUSTOMROWS });
  };

  const createCustomRow = async () => {
    dispatch({ type: CREATE_CUSTOMROW_BEGIN });
    try {
      const { customRowTitle } = state;
      await authFetch.post('/customPlayTVHomeRow', {
        rowTitle: customRowTitle,
        channelList: [],
      });
      dispatch({ type: CREATE_CUSTOMROW_SUCCESS });
      dispatch({ type: CLEAR_VALUES_ADD_CUSTOMROWS });
      getCustomRows();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_CUSTOMROW_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  //get a single custom row
  const getSingleCustomRow = async (customRowId) => {
    let url = `/customPlayTVHomeRow/singleCustomRow/${customRowId}`;

    dispatch({ type: GET_SINGLE_CUSTOMROW_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { customRow } = data;
      // console.log('nizar');
      // console.log(data);
      dispatch({
        type: GET_SINGLE_CUSTOMROW_SUCCESS,
        payload: {
          customRow,
        },
      });
    } catch (error) {
      // console.log(error.response);
      logoutUser();
    }
    clearAlert();
  };

  const deleteChannel = async (channelId, customRowId) => {
    // console.log(`delete channelId : ${channelId} | customRowId: ${customRowId}`);
    dispatch({ type: DELETE_CHANNEL_BEGIN });
    try {
      await authFetch.delete(
        `/customPlayTVHomeRow/singleCustomRow/${customRowId}/channel/${channelId}`
      );
      getSingleCustomRow(customRowId);
    } catch (error) {
      // console.log(error.response);
      logoutUser();
    }
  };

  const displayAlertText = (alertMsg) => {
    dispatch({ type: DISPLAY_ALERT_TEXT, payload: { alertMsg } });
    clearAlert();
  };

  const createNewPoster = async (data, customRowId) => {
    console.log('createNewPoster');
    // console.log(Object.fromEntries(data));
    // console.log(`customRowId ; ${customRowId}`);
    let url = `/customPlayTVHomeRow/singleCustomRow/${customRowId}`;

    dispatch({ type: CREATE_CHANNEL_BEGIN });
    try {
      const responseData = await authFetch.post(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(responseData);
      // const { data } = await authFetch(url);
      // const { customRow } = data;
      // console.log('nizar');
      // console.log(data);
      dispatch({
        type: CREATE_CHANNEL_SUCCESS,
      });
      getSingleCustomRow(customRowId);
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_CHANNEL_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const deleteRow = async (customRowId) => {
    dispatch({ type: DELETE_ROW_BEGIN });
    try {
      await authFetch.delete(`/customPlayTVHomeRow/${customRowId}`);
      getCustomRows();
    } catch (error) {
      // console.log(error.response);
      logoutUser();
    }
  };

  const updateRowIndex = async (latestData) => {
    dispatch({ type: EDIT_CUSTOMROW_BEGIN });
    try {
      for (const [index, data] of latestData.entries()) {
        await authFetch.patch(`/customPlayTVHomeRow/${data._id}`, {
          indexUpdate: true,
          newIndex: index + 1,
        });
        console.log(
          `rowId: ${data._id} - newIndex: ${index} - title: ${data.rowTitle}`
        );
      }

      dispatch({ type: EDIT_CUSTOMROW_SUCCESS });
      // dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_CUSTOMROW_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getJobs,
        setEditJob,
        deleteJob,
        editJob,
        showStats,
        clearSearchFilter,
        changePage,
        getCustomRows,
        clearValues_Add_CustomRows,
        createCustomRow,
        getSingleCustomRow,
        deleteChannel,
        displayAlertText,
        createNewPoster,
        deleteRow,
        updateRowIndex,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// custom hook
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
