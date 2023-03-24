import { useState, useEffect } from "react";
import axios from "axios";

function useCardData(url) {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(url);
      setCardData(data);
    })();
  }, []);

  return cardData;
}

export default useCardData;
