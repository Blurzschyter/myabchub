import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; //hook
import { Logo, FormRow, Alert } from '../components';
import { useAppContext } from '../context/appContext';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
  // showAlert: false //use global showAlert from AppContext
};

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  // global state and useNavigate
  const { user, isLoading, showAlert, displayAlert, registerUser, loginUser } =
    useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    // console.log(e.target);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target);
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    console.log('nizar here...');
    const currentUser = { name, email, password };
    if (isMember) {
      // console.log('already a member');
      loginUser(currentUser);
    } else {
      // console.log('not a member');
      // console.log(currentUser);
      registerUser(currentUser);
    }
  };

  //only invioke this on initial render and when user and navigate state is changed
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/'); //redirect current page to dashboard page is register is success.
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <section className='body-sign'>
      <div className='center-sign'>
        <a href='/' className='logo float-left'>
          <img src='img/logo.png' height={70} alt='Porto Admin' />
        </a>
        <div className='panel card-sign'>
          <div className='card-title-sign mt-3 text-end'>
            <h2 className='title text-uppercase font-weight-bold m-0'>
              <i className='bx bx-user-circle me-1 text-6 position-relative top-5' />
              {values.isMember ? 'Sign In' : 'Register'}
            </h2>
          </div>
          <div className='card-body'>
            {showAlert && <Alert />}
            <form onSubmit={handleSubmit}>
              {!values.isMember && (
                <FormRow
                  type='text'
                  name='name'
                  value={values.name}
                  handleChange={handleChange}
                />
              )}

              <FormRow
                type='email'
                name='email'
                value={values.email}
                handleChange={handleChange}
              />
              <FormRow
                type='password'
                name='password'
                value={values.password}
                handleChange={handleChange}
              />
              <div className='row'>
                <div className='col-sm-8'>
                  <div className='checkbox-custom checkbox-default'>
                    {/* <input id="RememberMe" name="rememberme" type="checkbox" />
              <label for="RememberMe">Remember Me</label> */}
                  </div>
                </div>
                <div className='col-sm-4 text-end'>
                  <button
                    type='submit'
                    disabled={isLoading}
                    className='btn btn-primary mt-2'
                  >
                    Submit
                  </button>
                </div>
              </div>
              <span className='mt-3 mb-3 line-thru text-center text-uppercase'>
                <span>or</span>
              </span>
              <p className='text-center'>
                {values.isMember ? 'Not a member yet?' : 'Already a member?'}
                <button
                  style={{
                    background: 'transparent',
                    border: 'transparent',
                    cursor: 'pointer',
                    color: '#2cb1bc',
                    letterSpacing: '1px',
                    fontWeight: 'bold',
                  }}
                  type='button'
                  onClick={toggleMember}
                >
                  {values.isMember ? ' Register' : ' Sign In'}
                </button>
              </p>
            </form>
          </div>
        </div>
        <p className='text-center text-muted mt-3 mb-3'>
          © Copyright 2022. All Rights Reserved.
        </p>
      </div>
    </section>
  );
};
export default Register;
