import * as React from "react";
import { bool, number, string } from "prop-types";
import { Link } from "gatsby";

const Pagination = (props) => {
  const { hasPreviousPage, hasNextPage, currentPage, basePath } = props;

  if (!hasPreviousPage && !hasNextPage) {
    return null;
  }

  return (
    <div>
      {hasPreviousPage && (
        <div>
          <Link
            to={`${basePath}${
              currentPage - 1 < 2 ? "" : `/${currentPage - 1}`
            }`}
          >
            Previous page
          </Link>
        </div>
      )}
      {hasNextPage && (
        <div>
          <Link to={`${basePath}/${currentPage + 1}`}>Next page</Link>
        </div>
      )}
    </div>
  );
};

Pagination.propTypes = {
  hasPreviousPage: bool.isRequired,
  hasNextPage: bool.isRequired,
  currentPage: number.isRequired,
  basePath: string.isRequired,
};

export default Pagination;
