import {STATUS_REPLACE} from '../actions/status';
import {DATA_POST_SUCCESS} from '../actions/locationitem';

const initialState = {
  loading: false,
  info: null,
  error: null,
  success: null,
  notificationMsg: '',
  status: '',
  page: '',
};

const status = (state = initialState, action) => {
  switch (action.type) {
    case STATUS_REPLACE: {
      return {
        ...state,
        loading: action.loading || false,
        info: action.info || null,
        error: action.error || null,
        success: action.success || null,
      }
    }
    case DATA_POST_SUCCESS: {
      return {
        ...state,
        pending: false,
        notificationMsg: action.notificationMsg,
        status: action.status,
        page: action.page,
        error: action.error
      }
    }
    default:
      return state;
  }
}

export default status;
