import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userActions } from "../../Store/userSlice";
import User from "../User/User";
import "./Pagination.css";

const Pagination = ({ data, pageLimit, title, dataLimit }) => {
  const search = useSelector((state) => state.users.searchQuery);
  const currentUser = useSelector((state) => state.users.currentUser);

  const dispatch = useDispatch();
  const [pages, setPages] = useState(0);

  useEffect(() => {
    setPages(Math.ceil(data.length / dataLimit));
  }, [data]);

  const [currentPage, setCurrentPage] = useState(1);
  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const changePage = (event) => {
    const pageNumber = event.target.textContent;
    setCurrentPage(pageNumber);
  };

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const lastIndex = startIndex + dataLimit;
    return data.slice(startIndex, lastIndex);
  };

  const getPaginationGroup = () => {
    const startNumber = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit)
      .fill()
      .map((_, index) => startNumber + index + 1);
  };

  const searchHandler = (event) => {
    dispatch(userActions.setSearch(event.target.value));
  };

  return (
    <div>
      <h1 className="title">{title}</h1>
      <div className="search-group">
        <input
          type="search"
          value={search}
          onChange={searchHandler}
          className="searchField"
          placeholder="Search Users"
        />
      </div>
      <div className="dataContainer">
        <table>
          <thead>
            <tr>
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
              <th>DESIGNATION</th>
              <th>EMAIL</th>
              <th>EXPERIENCE</th>
              <th>BRANCH</th>
              {currentUser.designation.toLowerCase() === "manager" ||
                (currentUser.designation.toLowerCase() === "ceo" && (
                  <th>Manager</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {getPaginatedData().map((d, idx) => (
              <User key={idx} data={d} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? "disabled" : ""}`}
        >
          prev
        </button>

        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${
              currentPage === item ? "active" : null
            }`}
          >
            <span>{item}</span>
          </button>
        ))}

        <button
          onClick={goToNextPage}
          className={`next ${currentPage === pages ? "disabled" : ""}`}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
