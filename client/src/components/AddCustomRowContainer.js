import { useAppContext } from '../context/appContext';
import { FormRow2, Alert } from '../components';

const AddCustomRowContainer = () => {
  const {
    isLoading,
    isCustomRowEditing,
    showAlert,
    customRowTitle,
    handleChange,
    clearValues_Add_CustomRows,
    displayAlert,
    createCustomRow,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customRowTitle) {
      displayAlert();
      return;
    }
    // if (isEditing) {
    //   // console.log('isEditing true');
    //   editJob();
    //   return;
    // }
    createCustomRow();
  };

  const handleCustomRowFormInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(`${name} : ${value}`);
    handleChange({ name: name, value: value });
  };

  return (
    <div className='row'>
      <div className='col-lg-12'>
        <section className='card'>
          <header className='card-header'>
            <h2 className='card-title'>
              {isCustomRowEditing ? 'Edit Custom Row' : 'Add New Custom Row'}
            </h2>
            {/* <p className='card-subtitle'>
                This is an example of form with multiple block columns.
              </p> */}
          </header>
          <form onSubmit={handleSubmit}>
            <div className='card-body'>
              {showAlert && <Alert />}
              <div className='row form-group pb-3'>
                <div className='col-lg-6'>
                  <FormRow2
                    type='text'
                    labelText='Custom Row Title'
                    name='customRowTitle'
                    value={customRowTitle}
                    handleChange={handleCustomRowFormInput}
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
                Create
              </button>
              <button
                type='reset'
                className='btn btn-default'
                onClick={(e) => {
                  e.preventDefault();
                  clearValues_Add_CustomRows();
                }}
              >
                Clear
              </button>
            </footer>
          </form>
        </section>
      </div>
    </div>
  );
};
export default AddCustomRowContainer;
