import { useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import Loading from './Loading';
import PageBtnContainer from './PageBtnContainer';
import LoadingNew from './LoadingNew';

const JobsContainer = () => {
  const {
    getJobs,
    jobs,
    isLoading,
    page,
    totalJobs,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
  } = useAppContext();

  useEffect(() => {
    getJobs();
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchType, sort]);

  if (isLoading) {
    return <LoadingNew style={{ margin: '0 auto' }} />;
  }

  if (jobs.length === 0) {
    return (
      <div>
        <h4 className='mt-0 mb-0 font-weight-bold text-dark'>
          No jobs to display
        </h4>
        {/* <p>Block Widgets are perfect to show some statistics.</p> */}
      </div>
    );
  }

  return (
    // <Wrapper>
    //   <h5>
    //     {totalJobs} job{jobs.length > 1 && 's'} found
    //   </h5>
    //   <div className='jobs'>
    //     {jobs.map((job) => {
    //       return <Job key={job._id} {...job} />;
    //     })}
    //   </div>
    //   {/* pagination buttons */}
    //   {numOfPages > 1 && <PageBtnContainer />}
    // </Wrapper>
    <div>
      <h4 className='mt-0 mb-0 font-weight-bold text-dark'>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h4>
      <div className='row pt-4 mt-2'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {/* pagination buttons */}
      {numOfPages > 1 && <PageBtnContainer />}
    </div>
  );
};
export default JobsContainer;
