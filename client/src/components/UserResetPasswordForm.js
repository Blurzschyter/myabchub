import { useState } from 'react';
import { FormRow2, Alert2, FormRowSelect2 } from '.';
import { useAppContext } from '../context/appContext';

const UserResetPasswordForm = ({ selectedUserObj }) => {
  const { isLoading, showAlert2, displayAlert2, resetSingleUserPassword } =
    useAppContext();

  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      displayAlert2();
      return;
    }

    const updateObjc = {
      userId: selectedUserObj._id,
      password,
    };
    // console.log(updateObjc);
    resetSingleUserPassword(updateObjc);
  };

  return (
    <div className='row'>
      {/* {console.log(customRowObj)} */}
      <div className='col-lg-12'>
        <section className='card'>
          <header className='card-header'>
            <h2 className='card-title'>Reset Password</h2>
            {/* <p className='card-subtitle'>
                This is an example of form with multiple block columns.
              </p> */}
          </header>
          <form onSubmit={handleSubmit}>
            <div className='card-body'>
              {showAlert2 && <Alert2 />}
              <div className='row form-group pb-3'>
                <div className='row form-group pb-3'>
                  <div className='col-lg-4'>
                    <FormRow2
                      type='text'
                      labelText='New Password'
                      name='password'
                      value={password}
                      handleChange={(e) => setPassword(e.target.value)}
                    />
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
                Reset Now
              </button>
            </footer>
          </form>
        </section>
      </div>
    </div>
  );
};
export default UserResetPasswordForm;
