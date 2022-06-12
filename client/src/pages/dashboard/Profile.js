import { useState } from 'react';
import { useAppContext } from '../../context/appContext';
import { FormRow2, Alert } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext();

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !lastName || !location) {
      displayAlert();
      return;
    }
    // console.log('update user');
    updateUser({ name, email, lastName, location });
  };

  return (
    <section role='main' className='content-body'>
      <header className='page-header'>
        <h2>Profile</h2>
      </header>
      <div className='row'>
        <div className='col-lg-12'>
          <section className='card'>
            <header className='card-header'>
              <h2 className='card-title'>My Profile</h2>
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
                      labelText='Last Name'
                      name='lastName'
                      value={lastName}
                      handleChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div className='col-lg-4'>
                    <FormRow2
                      type='email'
                      labelText='Email'
                      name='email'
                      value={email}
                      handleChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className='row form-group pb-3'>
                  <div className='col-lg-4'>
                    <FormRow2
                      type='text'
                      labelText='Location'
                      name='location'
                      value={location}
                      handleChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <footer className='card-footer text-end'>
                <button
                  type='submit'
                  disabled={isLoading}
                  className='btn btn-primary'
                >
                  {isLoading ? 'Please wait...' : 'Save Changes'}
                </button>
              </footer>
            </form>
          </section>
        </div>
      </div>
    </section>
  );
};

export default Profile;
