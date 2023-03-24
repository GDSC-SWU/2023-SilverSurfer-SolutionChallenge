import { useState, useEffect } from "react";
import axios from "axios";
import useToken from "./useToken";

function useLoginCardData(url) {
  const [cardData, setCardData] = useState([]);
  const ACCESS_TOKEN = useToken();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      setCardData(data);
    })();
  }, []);

  return cardData;
}

export default useLoginCardData;
