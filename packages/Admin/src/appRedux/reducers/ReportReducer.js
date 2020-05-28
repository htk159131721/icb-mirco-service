import * as Types from "../../constants/ActionTypes";
const initialState = {
  listSaleReport: [],
  listPaymentReport: [],
  listCommissionReport: [],
  listReportSaver: [],
  listWithdrawReport: [],
  listPartnerReport: [],
  listPackageReport: []
};
export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case Types.GET_LIST_SALE_REPORT_SUCCESS:
      return {
        ...state,
        listSaleReport: payload
      };
    case Types.GET_ORDER_DETAIL_OF_REPORT_SUCCESS:
      return {
        ...state,
        orderDetailReport: payload
      };
    case Types.GET_LIST_COMMISSION_REPORT_SUCCESS:
      return {
        ...state,
        listCommissionReport: payload
      };
    case Types.GET_LIST_PAYMENT_REPORT_SUCCESS:
      return {
        ...state,
        listPaymentReport: payload
      };
    case Types.GET_LIST_PARTNER_SUCCESS:
      return {
        ...state,
        listPartnerReport: payload
      };
    case Types.GET_LIST_PACKAGE_REPORT_SUCCESS:
      return {
        ...state,
        listPackageReport: payload
      };
    case Types.GET_LIST_REPORT_SAVER_SUCCESS:
      return {
        ...state,
        listReportSaver: payload
      };
    case Types.GET_LIST_WITHDRAW_REPORT_SUCCESS:
      return {
        ...state,
        listWithdrawReport: payload
      };
    case Types.UPDATE_WITHDRAW_REPORT_SUCCESS:
      let stateCopy = { ...state },
        index = stateCopy.listWithdrawReport.findIndex(
          obj => obj.id === payload.id
        );
      if (index !== -1) stateCopy.listWithdrawReport[index] = payload;
      return {
        ...state,
        listWithdrawReport: stateCopy.listWithdrawReport
      };
    default:
      return { ...state };
  }
};
