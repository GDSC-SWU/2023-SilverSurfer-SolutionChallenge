import uuid from "react-uuid";

function setRecentSearch(dispatch, isSearch, data) {
  if (data === "") return;

  const searchData = data;
  const deleteId = data;

  const addData = () => ({
    type: "SEARCH",
    id: uuid(),
    value: searchData,
  });

  const deleteData = () => ({
    type: "DELETE_SEARCH",
    id: deleteId,
  });

  if (isSearch) {
    dispatch(addData());
  } else {
    dispatch(deleteData());
  }
}

export default setRecentSearch;
