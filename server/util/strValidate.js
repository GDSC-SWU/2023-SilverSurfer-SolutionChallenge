// 문자열 유효성 검사
const strValidate = (str) => {
  let isValid = true;
  // 빈 문자열, undefined, null
  if (str === "" || str === undefined || str === null) {
    isValid = false;
    return isValid;
  }

  return isValid;
};

export default strValidate;
