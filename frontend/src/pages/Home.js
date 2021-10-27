import React, { useEffect, useState } from "react";
import { getKulfis } from "../common/backendApi";
import useApi from "../hook/useApi";
import ReactPaginate from "react-paginate";
import Kulfis from "./Kulfi/Kulfis";
import { GrNext, GrPrevious } from "react-icons/gr";
import { IoEllipsisHorizontal } from "react-icons/io5";
import "./Home.scss";
import Spin from "../components/UI/Loading/Spin";

function Home() {
  const { status, data, sendRequest } = useApi(getKulfis);
  useEffect(() => {
    sendRequest();
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
          {/* <div className="wecolme">
            <h2>Welcome to kulfizz</h2>
          </div> */}
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

export default Home;
