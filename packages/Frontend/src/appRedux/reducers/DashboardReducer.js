import * as Types from "../../constants/ActionTypes";

export default (state = {}, action) => {
  const { payload, meta } = action;
  switch (action.type) {
    case Types.GET_DASHBOARD_SUCCESS: {
      return {
        ...state,
        dashboard: payload
      };
    }
    case Types.POST_SENT_EMAIL_INVITE_SUCCESS: {
      return {
        ...state,
        sentEmailInviteResponse: payload
      };
    }
    case Types.CREATE_WITHDRAW_REQUEST_SUCCESS: {
      const stateCopied = {...state};
      stateCopied.dashboard.is_withdraw_in_mouth = 1
      return {
        ...stateCopied,
      };
    }
    default:
      return { ...state };
  }
};
