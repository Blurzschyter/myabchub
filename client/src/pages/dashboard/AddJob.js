import { FormRow2, Alert, FormRowSelect2 } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const AddJob = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }
    if (isEditing) {
      // console.log('isEditing true');
      editJob();
      return;
    }
    createJob();
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(`${name} : ${value}`);
    handleChange({ name: name, value: value });
  };

  return (
    <section role='main' className='content-body'>
      <header className='page-header'>
        <h2>Add Job</h2>
      </header>
      <div className='row'>
        <div className='col-lg-12'>
          <section className='card'>
            <header className='card-header'>
              <h2 className='card-title'>
                {isEditing ? 'Edit Job' : 'Add Job'}
              </h2>
              {/* <p className='card-subtitle'>
                This is an example of form with multiple block columns.
              </p> */}
            </header>
            <form onSubmit={handleSubmit}>
              <div className='card-body'>
                {showAlert && <Alert />}
                <div className='row form-group pb-3'>
                  <div className='col-lg-4'>
                    <FormRow2
                      type='text'
                      labelText='Position'
                      name='position'
                      value={position}
                      handleChange={handleJobInput}
                    />
                  </div>
                  <div className='col-lg-4'>
                    <FormRow2
                      type='text'
                      labelText='Company'
                      name='company'
                      value={company}
                      handleChange={handleJobInput}
                    />
                  </div>
                  <div className='col-lg-4'>
                    <FormRow2
                      type='text'
                      labelText='Job Location'
                      name='jobLocation'
                      value={jobLocation}
                      handleChange={handleJobInput}
                    />
                  </div>
                </div>
                <div className='row form-group pb-3'>
                  <div className='col-lg-4'>
                    <FormRowSelect2
                      labelText='Status'
                      name='status'
                      value={status}
                      handleChange={handleJobInput}
                      list={statusOptions}
                    />
                  </div>
                  <div className='col-lg-4'>
                    <FormRowSelect2
                      labelText='Job Type'
                      name='jobType'
                      value={jobType}
                      handleChange={handleJobInput}
                      list={jobTypeOptions}
                    />
                  </div>
                </div>
              </div>
              <footer className='card-footer text-end'>
                <button
                  type='submit'
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className='btn btn-primary'
                  style={{ marginRight: '5px' }}
                >
                  Submit{' '}
                </button>
                <button
                  type='reset'
                  className='btn btn-default'
                  onClick={(e) => {
                    e.preventDefault();
                    clearValues();
                  }}
                >
                  Clear
                </button>
              </footer>
            </form>
          </section>
        </div>
      </div>
    </section>
  );
};

export default AddJob;
