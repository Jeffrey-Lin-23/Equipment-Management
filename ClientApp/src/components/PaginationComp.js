import React from "react"
import { Pagination, PaginationItem, PaginationLink } from "reactstrap"

const PaginationComp = ({ itemPerPage, totalItems, paginate }) => {
  const pageNumeber = []

  // Calculate pages
  for (let i = 1; i <= Math.ceil(totalItems / itemPerPage); i++) {
    pageNumeber.push(i)
  }

  return (
    <div>
      <Pagination>
        {pageNumeber.map(n => (
          <PaginationItem key={n}>
            <PaginationLink onClick={() => paginate(n)}>{n}</PaginationLink>
          </PaginationItem>
        ))}
      </Pagination>
    </div>
  )
}

export default PaginationComp
