import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function CardDetail() {
  const [detailData, setDetailData] = useState([]);

  const postId = useLocation();

  console.log(postId.state);

  useEffect(() => {
    (async () => {
      const { data } = axios.get(
        `https://server-1-dot-silver-surfer-376919.du.r.appspot.com/content/${postId.state}`
      );

      setDetailData(data);
    })();
  }, []);

  console.log(detailData);

  return <div>CardDetail</div>;
}

export default CardDetail;
