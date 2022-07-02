import { useState } from 'react';
import { useAppContext } from '../context/appContext';
import { FormRow2, Alert, Alert2 } from '../components';

const EditCustomRowFormContainer = ({ customRowObj }) => {
  const { isLoading, displayAlert2, showAlert2, updateRowDetails } =
    useAppContext();

  const [rowTitle, setRowTitle] = useState(customRowObj.rowTitle);
  const [apiType, setApiType] = useState(customRowObj.apiType);
  const [hideDisplay, setHideDisplay] = useState(customRowObj.hideDisplay);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rowTitle || !apiType) {
      displayAlert2();
      return;
    }

    const updateObjc = {
      rowId: customRowObj._id,
      rowTitle,
      apiType,
      hideDisplay,
    };
    // console.log(updateObjc);
    updateRowDetails(updateObjc);
  };

  const handleClearForm = () => {
    // console.log('handle clear form | EditCustomRowFormContainer');
    setRowTitle('');
    setApiType('');
  };

  const handleOptionChange = (e) => {
    // console.log('handleOptionChange');
    // console.log(e.target.value);
    if (e.target.value === 'show') {
      setHideDisplay(false);
    } else {
      setHideDisplay(true);
    }
  };

  return (
    <div className='row'>
      {/* {console.log(customRowObj)} */}
      <div className='col-lg-12'>
        <section className='card'>
          <header className='card-header'>
            <h2 className='card-title'>Edit Dynamic Row</h2>
            {/* <p className='card-subtitle'>
                This is an example of form with multiple block columns.
              </p> */}
          </header>
          <form onSubmit={handleSubmit}>
            <div className='card-body'>
              {showAlert2 && <Alert2 />}
              <div className='row form-group pb-3'>
                <div className='col-lg-4'>
                  <FormRow2
                    type='text'
                    labelText='Row Title'
                    name='rowTitle'
                    value={rowTitle}
                    handleChange={(e) => setRowTitle(e.target.value)}
                  />
                </div>
                <div className='col-lg-4'>
                  <FormRow2
                    type='text'
                    labelText='apiType (for developer)'
                    name='apiType'
                    value={apiType}
                    handleChange={(e) => setApiType(e.target.value)}
                  />
                </div>
                <div className='col-lg-4'>
                  <div className='form-group'>
                    <label className='col-form-label' htmlFor='hideDisplay'>
                      Display Status
                    </label>
                    <div>
                      <div className='radio-custom radio-danger'>
                        <input
                          type='radio'
                          id='radioExample1'
                          name='radioExample'
                          value='hide'
                          checked={hideDisplay === true ? true : false}
                          onChange={handleOptionChange}
                        />
                        <label htmlFor='radioExample1'>Hide</label>
                      </div>
                      <div className='radio-custom radio-success'>
                        <input
                          type='radio'
                          id='radioExample2'
                          name='radioExample'
                          value='show'
                          checked={hideDisplay === true ? false : true}
                          onChange={handleOptionChange}
                        />
                        <label htmlFor='radioExample2'>Show</label>
                      </div>
                    </div>
                  </div>
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
                Update
              </button>
              <button
                type='reset'
                className='btn btn-default'
                onClick={(e) => {
                  e.preventDefault();
                  handleClearForm();
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
export default EditCustomRowFormContainer;
