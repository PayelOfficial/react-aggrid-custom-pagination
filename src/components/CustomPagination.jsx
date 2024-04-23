export const CustomPagination = ({ state, reducerDispatch }) => {
  const { pageSection } = state;

  const handlePrevPage = () => {
    reducerDispatch({
      type: 'UPDATE_PAGE_SECTION',
      payload: { pageNumber: pageSection?.pageNumber - 1 },
    });
  };

  const handleNextPage = () => {
    reducerDispatch({
      type: 'UPDATE_PAGE_SECTION',
      payload: { pageNumber: pageSection?.pageNumber + 1 },
    });
  };

  return (
    <div>
      <button onClick={handlePrevPage} disabled={pageSection?.pageNumber === 1}>
        Previous Page
      </button>
      <span>
        Page {pageSection?.pageNumber} of {pageSection?.totalPages}
      </span>
      <button
        onClick={handleNextPage}
        disabled={pageSection?.pageNumber === pageSection?.totalPages}
      >
        Next Page
      </button>
    </div>
  );
};
