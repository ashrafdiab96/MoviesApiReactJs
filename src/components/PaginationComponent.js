import React from 'react'
import ReactPaginate from 'react-paginate';

const PaginationComponent = ({ getPage, totalPages, currentLang }) => {
    /**
     * @method handlePageClick
     * @description implement getPage to get movies based on paginate
     * @access public
     * @returns {array[object]}
     */
    const handlePageClick = (data) => {
        getPage(data.selected + 1);
    };
    const pageCount = totalPages;
    
    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel={currentLang.next}
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel={currentLang.prev}
            renderOnZeroPageCount={null}
            containerClassName={'pagination justify-content-center'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            activeClassName={'active'}
      />
    );
}

export default PaginationComponent;
