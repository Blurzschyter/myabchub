import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { FormRow, FormRowSelect, Alert } from '../components';

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
    <Wrapper>
      <form className='form'>
        <h3>{isCustomRowEditing ? 'edit custom row' : 'add new custom row'}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          <FormRow
            type='text'
            labelText='Custom Row Title'
            name='customRowTitle'
            value={customRowTitle}
            handleChange={handleCustomRowFormInput}
          />
          {/* <FormRow
            type='text'
            labelText='Description'
            name='customRowTitle'
            value={customRowTitle}
            handleChange={handleCustomRowFormInput}
          /> */}
          <div className='btn-container'>
            <button
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              create
            </button>
            <button
              className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault();
                clearValues_Add_CustomRows();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddCustomRowContainer;
