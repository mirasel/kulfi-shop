import React, { useEffect, useState } from "react";
import useApi from "../../hook/useApi";
import ReactPaginate from "react-paginate";
import Kulfis from "../Kulfi/Kulfis";
import { GrNext, GrPrevious } from "react-icons/gr";
import { IoEllipsisHorizontal } from "react-icons/io5";
import "../Home.scss";
import Spin from "../../components/UI/Loading/Spin";
import { useParams } from "react-router-dom";
import { getCategory } from "../../common/backendApi";

function Category() {
  const { status, data, sendRequest } = useApi(getCategory);
  const { categoryId } = useParams();
  useEffect(() => {
    sendRequest(categoryId);
  }, [sendRequest]);

  const [currentPageNumber, setCurrentPageNumber] = useState(0);
  const itemsPerPage = 8;
  const pagesVisited = currentPageNumber * itemsPerPage;
  const pageCount =
    status === "completed" ? Math.ceil(data.kulfis.length / itemsPerPage) : 0;
  const items =
    status === "completed"
      ? data.kulfis.slice(pagesVisited, pagesVisited + itemsPerPage)
      : [];
  const reviews =
    status === "completed"
      ? data.reviews.slice(pagesVisited, pagesVisited + itemsPerPage)
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
        <main className="home-content">
          <div className="categoryHeader">{data.category.name} Flavours</div>
          <Kulfis kulfis={items} reviews={reviews} />
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
        </main>
      )}
    </React.Fragment>
  );
}

export default Category;
