import { useSelector } from "react-redux";

function useToken() {
  const ACCESS_TOKEN = useSelector((state) => state?.accessToken);

  return ACCESS_TOKEN;
}

export default useToken;
