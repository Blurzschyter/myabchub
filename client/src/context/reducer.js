import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
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
  DISPLAY_ALERT_2,
  CLEAR_ALERT_2,
  DISPLAY_ALERT_2_TEXT,
  EDIT_CUSTOMROW_DETAILS_BEGIN,
  EDIT_CUSTOMROW_DETAILS_SUCCESS,
  EDIT_CUSTOMROW_DETAILS_ERROR,
  LOADING_START,
  LOADING_END,
  GET_USERS_SUCCESS,
  GET_SINGLE_USER_SUCCESS,
  EDIT_SUCCESS,
  EDIT_ERROR,
} from './actions';
import { initialState } from './appContext';

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values!',
    };
  }

  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    };
  }

  if (action.type === REGISTER_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Created! Redirecting...',
    };
  }

  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if (action.type === LOGIN_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: 'Login Successful! Redirecting...',
    };
  }

  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      jobLocation: '',
      userLocation: '',
    };
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Profile Updated!',
    };
  }

  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    };
  }

  if (action.type === CLEAR_VALUES) {
    const resetState = {
      isEditing: false,
      editJobId: '',
      position: '',
      company: '',
      jobLocation: state.userLocation,
      jobType: 'full-time',
      status: 'pending',
    };

    return {
      ...state,
      ...resetState,
    };
  }

  if (action.type === CREATE_JOB_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === CREATE_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'New Job Created!',
    };
  }

  if (action.type === CREATE_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if (action.type === GET_JOBS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }

  if (action.type === GET_JOBS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      jobs: action.payload.jobs,
      totalJobs: action.payload.totalJobs,
      numOfPages: action.payload.numOfPages,
    };
  }

  if (action.type === SET_EDIT_JOB) {
    const job = state.jobs.find((job) => job._id === action.payload.id);
    const { _id, position, company, jobLocation, jobType, status } = job;

    return {
      ...state,
      isEditing: true,
      editJobId: _id,
      position,
      company,
      jobLocation,
      jobType,
      status,
    };
  }

  if (action.type === DELETE_JOB_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === EDIT_JOB_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === EDIT_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Job Updated!',
    };
  }

  if (action.type === EDIT_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  //sama mcm GET_JOBS_
  if (action.type === SHOW_STATS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }

  if (action.type === SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      stats: action.payload.stats,
      monthlyApplications: action.payload.monthlyApplications,
    };
  }

  if (action.type === CLEAR_SEARCH_FILTERS) {
    return {
      ...state,
      search: '',
      searchStatus: 'all',
      searchType: 'all',
      sort: 'latest',
    };
  }

  if (action.type === CHANGE_PAGE) {
    return {
      ...state,
      page: action.payload.page,
    };
  }

  if (action.type === GET_CUSTOMROWS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }

  if (action.type === GET_CUSTOMROWS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      customRows: action.payload.customRows,
      totalCustomRows: action.payload.totalCustomRows,
    };
  }

  if (action.type === CLEAR_VALUES_ADD_CUSTOMROWS) {
    const resetState = {
      customRowTitle: '',
    };

    return {
      ...state,
      ...resetState,
    };
  }

  if (action.type === CREATE_CUSTOMROW_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === CREATE_CUSTOMROW_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'New Dynamic Row Created!',
    };
  }

  if (action.type === CREATE_CUSTOMROW_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if (action.type === GET_SINGLE_CUSTOMROW_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }

  if (action.type === GET_SINGLE_CUSTOMROW_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      selectedCustomRowObj: action.payload.customRow,
    };
  }

  if (action.type === DELETE_CHANNEL_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === DISPLAY_ALERT_TEXT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.alertMsg,
    };
  }

  if (action.type === CREATE_CHANNEL_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === CREATE_CHANNEL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'New Poster Created!',
    };
  }

  if (action.type === CREATE_CHANNEL_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if (action.type === DELETE_ROW_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === EDIT_CUSTOMROW_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === EDIT_CUSTOMROW_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      // showAlert: true,
      // alertType: 'success',
      // alertText: 'Job Updated!',
    };
  }

  if (action.type === EDIT_CUSTOMROW_ERROR) {
    return {
      ...state,
      isLoading: false,
      // showAlert: true,
      // alertType: 'danger',
      // alertText: action.payload.msg,
    };
  }

  if (action.type === DISPLAY_ALERT_2) {
    return {
      ...state,
      showAlert2: true,
      alert2Type: 'danger',
      alert2Text: 'Please provide all values!',
    };
  }

  if (action.type === CLEAR_ALERT_2) {
    return {
      ...state,
      showAlert2: false,
      alert2Type: '',
      alert2Text: '',
    };
  }

  if (action.type === DISPLAY_ALERT_2_TEXT) {
    return {
      ...state,
      showAlert2: true,
      alert2Type: 'danger',
      alert2Text: action.payload.alertMsg,
    };
  }

  if (action.type === EDIT_CUSTOMROW_DETAILS_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === EDIT_CUSTOMROW_DETAILS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert2: true,
      alert2Type: 'success',
      alert2Text: 'Dynamic Row detail updated!',
    };
  }

  if (action.type === EDIT_CUSTOMROW_DETAILS_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if (action.type === LOADING_START) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }

  if (action.type === LOADING_END) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === GET_USERS_SUCCESS) {
    return {
      ...state,
      users: action.payload.users,
    };
  }

  if (action.type === GET_SINGLE_USER_SUCCESS) {
    return {
      ...state,
      selectedUserObj: action.payload.selectedUserObj,
    };
  }

  if (action.type === EDIT_SUCCESS) {
    if (action.payload.alertType === 2) {
      return {
        ...state,
        isLoading: false,
        showAlert2: true,
        alert2Type: 'success',
        alert2Text: action.payload.msg,
      };
    }

    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.msg,
    };
  }

  if (action.type === EDIT_ERROR) {
    if (action.payload.alertType === 2) {
      return {
        ...state,
        isLoading: false,
        showAlert2: true,
        alert2Type: 'danger',
        alert2Text: action.payload.msg,
      };
    }

    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  throw new Error(`no such action : ${action.type}`);
};

export default reducer;
