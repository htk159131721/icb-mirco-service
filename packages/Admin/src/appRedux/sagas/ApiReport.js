import axios from 'axios'
import * as apiURL from 'constants/apiURL'
// sale
const getListSaleReportFromApi = async (token, queryString) => {
    const request = await axios({ 
        method: 'get', 
        url: !!queryString ? `${apiURL.API_GET_LIST_SALE_REPORT}?${queryString}` : apiURL.API_GET_LIST_SALE_REPORT, 
        headers: { 'Authorization': token } 
    })
    return request;
}
const getDetailSaleReportFromApi = async (token, id) => {
    const request = await axios({ 
        method: 'get', 
        url: `${apiURL.API_GET_ORDER_DETAIL_REPORT}?order_id=${id}`, 
        headers: { 'Authorization': token } 
    })
    return request;
}
// commission
const getListCommissionReportFromApi = async (token, queryString) => {
    const request = await axios({ 
        method: 'get', 
        url: !!queryString ? `${apiURL.API_GET_LIST_COMMISSION_REPORT}?${queryString}` : apiURL.API_GET_LIST_COMMISSION_REPORT, 
        headers: { 'Authorization': token } 
    })
    return request;
}
// payment
const getListPaymentReportFromApi = async (token, queryString) => {
    const request = await axios({ 
        method: 'get', 
        url: !!queryString ? `${apiURL.API_GET_LIST_PAYMENT_REPORT}?${queryString}` : apiURL.API_GET_LIST_PAYMENT_REPORT, 
        headers: { 'Authorization': token } 
    })
    return request;
}
// partner
const getListPartnerReportFromApi = async (token, queryString) => {
    const request = await axios({ 
        method: 'get', 
        url: !!queryString ? `${apiURL.API_GET_LIST_PARTNER_REPORT}?${queryString}` : apiURL.API_GET_LIST_PARTNER_REPORT, 
        headers: { 'Authorization': token } 
    })
    return request;
}
// package
const getListPackageReportFromApi = async (token, queryString) => {
    const request = await axios({ 
        method: 'get', 
        url: !!queryString ? `${apiURL.API_GET_LIST_PACKAGE_REPORT}?${queryString}` : apiURL.API_GET_LIST_PACKAGE_REPORT, 
        headers: { 'Authorization': token } 
    })
    return request;
}
// withdraw
const getListWithdrawReportFromApi = async (token, queryString) => {
    const request = await axios({ 
        method: 'get', 
        url: !!queryString ? `${apiURL.API_GET_LIST_WITHDRAW_REPORT}?${queryString}` : apiURL.API_GET_LIST_WITHDRAW_REPORT, 
        headers: { 'Authorization': token } 
    })
    return request;
}
const updateWithdrawReportFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_UPDATE_WITHDRAW_REPORT,
        headers: { 'Authorization': token },
        data
    })
    return request;
}
export const API = {
    getListSaleReportFromApi,
    getDetailSaleReportFromApi,
    getListCommissionReportFromApi,
    getListPartnerReportFromApi,
    getListPaymentReportFromApi,
    getListWithdrawReportFromApi,
    updateWithdrawReportFromApi,
    getListPackageReportFromApi
}