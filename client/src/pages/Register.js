import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; //hook
import { Logo, FormRow, Alert } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
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
  // console.log(state);

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
    <Wrapper className='full-page'>
      <form className='form' onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}
        {/* name input */}
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
        <button type='submit' className='btn btn-block' disabled={isLoading}>
          submit
        </button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type='button' onClick={toggleMember} className='member-btn'>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
