import axios from "axios";
import * as apiURL from "constants/apiURL";

const getListCMSFromApi = async (token, queryString) =>
  await axios({
    method: "get",
    url: !!queryString
      ? `${apiURL.API_GET_LIST_CMS}?${queryString}`
      : apiURL.API_GET_LIST_CMS,
    headers: { Authorization: token }
  });

const getListWithDrawFromApi = async (token, queryString) =>
  await axios({
    method: "get",
    url: !!queryString
      ? `${apiURL.API_GET_LIST_WITHDRAW}?${queryString}`
      : apiURL.API_GET_LIST_WITHDRAW,
    headers: { Authorization: token }
  });

export const API = {
  getListCMSFromApi,
  getListWithDrawFromApi
};
