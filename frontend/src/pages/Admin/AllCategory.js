import React, { useEffect, useState } from "react";
import { readCategories } from "../../common/backendApi";
import useApi from "../../hook/useApi";
import ReactPaginate from "react-paginate";
import "./AllKulfi.scss";
import CategoryList from "./CategoryList";
import { GrNext, GrPrevious } from "react-icons/gr";
import { IoEllipsisHorizontal } from "react-icons/io5";
import Spin from "../../components/UI/Loading/Spin";

function AllCategory() {
  const { status, data, sendRequest } = useApi(readCategories);
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  const [currentPageNumber, setCurrentPageNumber] = useState(0);
  const itemsPerPage = 5;
  const pagesVisited = currentPageNumber * itemsPerPage;
  const pageCount =
    status === "completed" ? Math.ceil(data.length / itemsPerPage) : 0;
  const items =
    status === "completed"
      ? data.slice(pagesVisited, pagesVisited + itemsPerPage)
      : [];

  const handlePageChange = ({ selected }) => {
    setCurrentPageNumber(selected);
  };

  return (
    <React.Fragment>
      {status === "pending" && (
        <div className="loading">
          <Spin />
        </div>
      )}
      {status === "completed" && (
        <div className="kulfilist-content">
          <CategoryList categories={items} />
          <ReactPaginate
            previousLabel={<GrPrevious />}
            nextLabel={<GrNext />}
            breakLabel={<IoEllipsisHorizontal />}
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName="pagination"
            previousLinkClassName="pagination-previous"
            nextLinkClassName="pagination-next"
            disabledClassName="pagination-disabled"
            activeClassName="pagination-active"
          />
        </div>
      )}
    </React.Fragment>
  );
}

export default AllCategory;
