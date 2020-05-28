import antdVn from "antd/lib/locale-provider/vi_VN";
import appLocaleData from "react-intl/locale-data/vi";
import enMessages from "../locales/vi_VN.json";

const VnLang = {
  messages: {
    ...enMessages
  },
  antd: antdVn,
  locale: 'vi-VN',
  data: appLocaleData
};
export default VnLang;
