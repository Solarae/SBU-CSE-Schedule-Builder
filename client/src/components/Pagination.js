import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';


const Pag = (props) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(props.totalPosts / props.coursesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <Pagination aria-label="Page navigation example">
        {pageNumbers.map(number => (
            <PaginationItem key={number}>
                <PaginationLink onClick={() => props.setCurrentPage(number)}>
                    {number}
                </PaginationLink>
            </PaginationItem>
        ))}
        </Pagination>
      );
    }

    export default Pag