
export const showStatus = status => {
    let result = "";
    switch (status) {
      case 1:
        result = "SUCCESS";
        break;
      case 2:
        result = "PENDING";
        break;
      case 0:
        result = "FAILED";
        break;
      default:
        result = "SUCCESS";
        break;
    }
    return result;
  };
  
  export const showStatusOfReport = status => {
    let result = "";
    switch (status) {
      case 1:
        result = "COMPLETE";
        break;
      case 2:
        result = "NEW";
        break;
      case 3:
        result = "PENDING";
        break;
      default:
        result = "COMPLETE";
        break;
    }
    return result;
  };