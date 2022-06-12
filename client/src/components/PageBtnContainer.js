import { useAppContext } from '../context/appContext';

const PageBtnContainer = () => {
  const { numOfPages, page, changePage } = useAppContext();

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });
  // console.log(pages);

  const prevPage = () => {
    console.log('prev page');
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    changePage(newPage);
  };

  const nextPage = () => {
    console.log('next page');
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }
    changePage(newPage);
  };

  return (
    <>
      <hr className='solid mt-5 opacity-4' />
      <div className='row row-gutter-sm justify-content-between'>
        <div className='col-lg-auto order-2 order-lg-1'>
          <p className='text-center text-lg-left mb-0'>
            Showing 1-8 of 60 results
          </p>
        </div>
        <div className='col-lg-auto order-1 order-lg-2 mb-3 mb-lg-0'>
          <nav aria-label='Page navigation example'>
            <ul className='pagination pagination-modern pagination-modern-spacing justify-content-center justify-content-lg-start mb-0'>
              <li
                className='page-item'
                onClick={prevPage}
                style={{ cursor: 'pointer' }}
              >
                {/* eslint-disable-next-line */}
                <a className='page-link prev' aria-label='Previous'>
                  <span>
                    <i className='fas fa-chevron-left' aria-label='Previous' />
                  </span>
                </a>
              </li>
              {pages.map((pageNumber) => {
                return (
                  <li
                    style={{ cursor: 'pointer' }}
                    key={pageNumber}
                    className={
                      pageNumber === page ? 'page-item active' : 'page-item'
                    }
                  >
                    {/* eslint-disable-next-line */}
                    <a
                      className='page-link'
                      onClick={() => changePage(pageNumber)}
                    >
                      {pageNumber}
                    </a>
                  </li>
                );
              })}
              <li
                className='page-item'
                onClick={nextPage}
                style={{ cursor: 'pointer' }}
              >
                {/* eslint-disable-next-line */}
                <a className='page-link next' aria-label='Next'>
                  <span>
                    <i className='fas fa-chevron-right' aria-label='Next' />
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
export default PageBtnContainer;
