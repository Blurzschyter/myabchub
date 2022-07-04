import { useState } from 'react';
import { FormRow2, Alert, FormRowSelect2 } from '.';
import { useAppContext } from '../context/appContext';

const UserUpdateForm = ({ selectedUserObj }) => {
  const { isLoading, showAlert, displayAlert, updateSingleUser } =
    useAppContext();
  const [name, setName] = useState(selectedUserObj.name);
  const [email, setEmail] = useState(selectedUserObj.email);
  const [role, setRole] = useState(selectedUserObj.role);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      displayAlert();
      return;
    }

    const updateObjc = {
      userId: selectedUserObj._id,
      name,
      role,
    };
    // console.log(updateObjc);
    updateSingleUser(updateObjc);
  };

  const handleOptionChange = (e) => {
    console.log('handleOptionChange');
    console.log(e.target.value);
    if (e.target.value === 'user') {
      setRole('user');
    } else {
      setRole('admin');
    }
  };

  return (
    <div className='row'>
      {/* {console.log(customRowObj)} */}
      <div className='col-lg-12'>
        <section className='card'>
          <header className='card-header'>
            <h2 className='card-title'>Update User Details</h2>
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
                    labelText='Name'
                    name='name'
                    value={name}
                    handleChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='col-lg-4'>
                  <FormRow2
                    type='text'
                    labelText='Email'
                    name='email'
                    value={email}
                    readonly={true}
                    handleChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className='col-lg-4'>
                  <div className='form-group'>
                    <label className='col-form-label' htmlFor='role'>
                      Roles
                    </label>
                    <div>
                      <div className='radio-custom radio-primary'>
                        <input
                          type='radio'
                          id='radioExample1'
                          name='radioExample'
                          value='admin'
                          checked={role === 'admin' ? true : false}
                          onChange={handleOptionChange}
                        />
                        <label htmlFor='radioExample1'>Admin</label>
                      </div>
                      <div className='radio-custom radio-primary'>
                        <input
                          type='radio'
                          id='radioExample2'
                          name='radioExample'
                          value='user'
                          checked={role === 'user' ? true : false}
                          onChange={handleOptionChange}
                        />
                        <label htmlFor='radioExample2'>User</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- Modal Form --> */}
              <div
                id='modalForm'
                className='modal-block modal-block-primary mfp-hide'
              >
                <section className='card'>
                  <header className='card-header'>
                    <h2 className='card-title'>Registration Form</h2>
                  </header>
                  <div className='card-body'></div>
                  <footer className='card-footer'>
                    <div className='row'>
                      <div className='col-md-12 text-end'>
                        <button className='btn btn-primary modal-confirm'>
                          Submit
                        </button>
                        <button className='btn btn-default modal-dismiss'>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </footer>
                </section>
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
                type='button'
                className='btn btn-danger'
                onClick={(e) => {
                  e.preventDefault();
                  console.log('button delete pressed');
                }}
              >
                Delete User
              </button>
            </footer>
          </form>
        </section>
      </div>
    </div>
  );
};
export default UserUpdateForm;
