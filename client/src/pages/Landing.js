import main from '../assets/images/undraw_explore_re_8l4v.svg';
import Wrapper from '../assets/wrappers/LandingPage';
// import Logo from '../components/Logo';
import { Logo } from '../components';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <section className='body-sign body-locked'>
      <div className='center-sign'>
        <div className='panel card-sign'>
          <div className='card-body'>
            <div
              className='current-user text-center'
              style={{ marginTop: '0px' }}
            >
              <div
                className='image-frame-wrapper'
                style={{ marginBottom: '10px' }}
              >
                <img
                  src={main}
                  className='img-fluid'
                  alt='Product Short Name'
                />
              </div>

              <h2 className='user-name text-dark m-0'>myABC Hub</h2>
              <p className='user-email m-0'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                orci lorem, consectetur dictum eros non, tincidunt faucibus
                metus. Etiam fermentum sagittis leo, viverra consectetur lacus.
                Etiam interdum bibendum porttitor.
              </p>
            </div>
            <div className='row'>
              <div className='col-12'>
                <Link to='/register' className='btn btn-primary col-12'>
                  Login/Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
