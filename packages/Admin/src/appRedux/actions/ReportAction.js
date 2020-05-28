import * as Types from '../../constants/ActionTypes'


export const getListReportSaverSuccess = data => {
    return {
        type: Types.GET_LIST_REPORT_SAVER_SUCCESS,
        payload: data
    }
}
// sales
export const getListSaleReport = (queryString) => {
    return {
        type: Types.GET_LIST_SALE_REPORT,
        queryString
    }
}
export const getListSaleReportSuccess = data => {
    return {
        type: Types.GET_LIST_SALE_REPORT_SUCCESS,
        payload: data
    }
}
export const getOrderDetailOfReport = id => {
    return {
        type: Types.GET_ORDER_DETAIL_OF_REPORT,
        id
    }
}
export const getOrderDetailOfReportSuccess = data => {
    return {
        type: Types.GET_ORDER_DETAIL_OF_REPORT_SUCCESS,
        payload: data
    }
}
// commission 
export const getListCommissionReport = (queryString) => {
    return {
        type: Types.GET_LIST_COMMISSION_REPORT,
        queryString
    }
}
export const getListCommissionReportSuccess = data => {
    return {
        type: Types.GET_LIST_COMMISSION_REPORT_SUCCESS,
        payload: data
    }
}

// payment 
export const getListPayment = (queryString) => {
    return {
        type: Types.GET_LIST_PAYMENT_REPORT,
        queryString
    }
}
export const getListPaymentSuccess = data => {
    return {
        type: Types.GET_LIST_PAYMENT_REPORT_SUCCESS,
        payload: data
    }
}
// withdraw 
export const getListWithdrawReport = (queryString) => {
    return {
        type: Types.GET_LIST_WITHDRAW_REPORT,
        queryString
    }
}
export const getListWithdrawReportSuccess = data => {
    return {
        type: Types.GET_LIST_WITHDRAW_REPORT_SUCCESS,
        payload: data
    }
}

export const updateWithdrawReport = data => {
    return {
        type: Types.UPDATE_WITHDRAW_REPORT,
        data
    }
}
export const updateWithdrawReportSuccess = data => {
    return {
        type: Types.UPDATE_WITHDRAW_REPORT_SUCCESS,
        payload: data
    }
}
//partner
export const getListPartner = (queryString) => {
    return {
        type: Types.GET_LIST_PARTNER,
        queryString
    }
}
export const getListPartnerSuccess = data => {
    return {
        type: Types.GET_LIST_PARTNER_SUCCESS,
        payload: data
    }
}
//partner
export const getListPackageReport = (queryString) => {
    return {
        type: Types.GET_LIST_PACKAGE_REPORT,
        queryString
    }
}
export const getListPackageReportSuccess = data => {
    return {
        type: Types.GET_LIST_PACKAGE_REPORT_SUCCESS,
        payload: data
    }
}