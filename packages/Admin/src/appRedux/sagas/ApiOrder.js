import axios from "axios";
import * as apiURL from "constants/apiURL";

const getListOrderFromApi = async (token) =>
  await axios({
    method: "get",
    url: apiURL.API_GET_LIST_ORDER,
    headers: { Authorization: token },
  });
const getListOrderPendingFromApi = async (token) =>
  await axios({
    method: "get",
    url: apiURL.API_GET_LIST_ORDER_PENDING,
    headers: { Authorization: token },
  });
const getDetailOrderFromApi = async (token, id) =>
  await axios({
    method: "get",
    url: `${apiURL.API_GET_DETAIL_ORDER}?id=${id}`,
    headers: { Authorization: token },
  });
const createOrderFromApi = async (token, data) =>
  await axios({
    method: "post",
    url: apiURL.API_CREATE_ORDER,
    headers: { Authorization: token },
    data,
  });
const updateOrderFromApi = async (token, data) =>
  await axios({
    method: "post",
    url: apiURL.API_UPDATE_ORDER,
    headers: { Authorization: token },
    data,
  });
const updateStatusOrderFromApi = async (token, data) =>
  await axios({
    method: "post",
    url: `${apiURL.API_UPDATE_STATUS_ORDER}`,
    headers: { Authorization: token },
    data,
  });

const checkCodePromotionFromApi = async (token, data) =>
  await axios({
    method: "post",
    url: `${apiURL.API_CHECK_CODE_PROMOTION}`,
    headers: { Authorization: token },
    data,
  });

export const API = {
  getListOrderFromApi,
  getListOrderPendingFromApi,
  getDetailOrderFromApi,
  createOrderFromApi,
  updateOrderFromApi,
  updateStatusOrderFromApi,
  checkCodePromotionFromApi,
};
