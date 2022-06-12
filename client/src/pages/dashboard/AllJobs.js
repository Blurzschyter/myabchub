import { JobsContainer, SearchContainer } from '../../components';

const AllJobs = () => {
  return (
    <section role='main' className='content-body'>
      <header className='page-header'>
        <h2>All Jobs</h2>
      </header>
      <SearchContainer />
      <hr className='solid mt-3 opacity-4' />
      <JobsContainer />
    </section>
  );
};

export default AllJobs;
