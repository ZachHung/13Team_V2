import React from "react";
// import PropTypes from 'prop-types'

// Pagination.PropTypes = {
//     pagination: PropTypes.object.isRequired,
//     onPageChange: PropTypes.func,
// }
// Pagination.defaultProps = {
//     onPageChange: null,
// }

function Pagination({productPerpage,totalProducts,paginate}){
    // const {pagination, onPageChange}=  props
    // const {_page,_limit,_totalRows} = pagination
    // const totalPages = Math.ceil(_totalRows/_limit)
    // function handlePageChange(newPage){
    //     if(onPageChange){
    //         onPageChange(newPage)
    //     }
    // }
    const pageNumbers = [];
    for (let i=1;i<=Math.ceil(totalProducts/productPerpage);i++){
        pageNumbers.push(i);
    }
    return(
            <ul className="pagination">
                {
                    pageNumbers.map(number => (
                        <span id="page1" key={number} onClick={() => paginate(number)}>{number}</span>

                    ))
                }
            {/* <span id="page2" >
              2
            </span>
            <span id="page3">3</span>
            <span id="page4">4</span>

            <span className="icon">...</span>
            <span className="last" id="pageLast">
              Last
            </span> */}
          </ul>
       
    )
}
export default Pagination