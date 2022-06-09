import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';

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
    <Wrapper>
      <button className='prev-btn' onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className='btn-container'>
        {pages.map((pageNumber) => {
          return (
            <button
              type='button'
              key={pageNumber}
              onClick={() => changePage(pageNumber)}
              className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button className='next-btn' onClick={nextPage}>
        <HiChevronDoubleRight />
        next
      </button>
    </Wrapper>
  );
};
export default PageBtnContainer;
