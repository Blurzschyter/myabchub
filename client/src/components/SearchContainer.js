import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/SearchContainer';
import { FormRow2, FormRowSelect2 } from '../components';

const SearchContainer = () => {
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    statusOptions,
    jobTypeOptions,
    handleChange,
    clearSearchFilter,
  } = useAppContext();

  const handleSearch = (e) => {
    if (isLoading) {
      return;
    }
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearSearchFilter();
  };

  return (
    <div className='row'>
      <div className='col-lg-12'>
        <section className='card'>
          <header className='card-header'>
            <h2 className='card-title'>Search Form</h2>
            {/* <p className='card-subtitle'>
                This is an example of form with multiple block columns.
              </p> */}
          </header>
          <form onSubmit={handleSubmit}>
            <div className='card-body'>
              <div className='row form-group pb-3'>
                <div className='col-lg-4'>
                  <FormRow2
                    type='text'
                    labelText='Search'
                    name='search'
                    value={search}
                    handleChange={handleSearch}
                  />
                </div>
                <div className='col-lg-4'>
                  <FormRowSelect2
                    labelText='Status'
                    name='searchStatus'
                    value={searchStatus}
                    handleChange={handleSearch}
                    list={['all', ...statusOptions]}
                  />
                </div>
                <div className='col-lg-4'>
                  <FormRowSelect2
                    labelText='Job Type'
                    name='searchType'
                    value={searchType}
                    handleChange={handleSearch}
                    list={['all', ...jobTypeOptions]}
                  />
                </div>
              </div>
              <div className='row form-group pb-3'>
                <div className='col-lg-4'>
                  <FormRowSelect2
                    labelText='Sort'
                    name='sort'
                    value={sort}
                    handleChange={handleSearch}
                    list={sortOptions}
                  />
                </div>
              </div>
            </div>
            <footer className='card-footer text-end'>
              <button
                type='submit'
                disabled={isLoading}
                onClick={handleSubmit}
                className='btn btn-primary'
              >
                Clear Filters
              </button>
            </footer>
          </form>
        </section>
      </div>
    </div>
  );
};
export default SearchContainer;
