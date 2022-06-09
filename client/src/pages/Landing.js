import main from '../assets/images/main-alternative.svg';
import Wrapper from '../assets/wrappers/LandingPage';
// import Logo from '../components/Logo';
import { Logo } from '../components';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Wrapper>
      <main>
        <nav>
          <Logo />
        </nav>
        <div className='container page'>
          <div className='info'>
            <h1>
              job <span>tracking</span> app
            </h1>
            <p>
              I'm baby thundercats iceland literally gentrify cloud bread
              butcher direct trade sriracha air plant. PBR&B put a bird on it
              woke aesthetic selvage tumblr. Lo-fi shabby chic scenester
              crucifix farm-to-table mumblecore. Craft beer quinoa chartreuse
              bushwick PBR&B chicharrones.
            </p>
            <Link to='/register' className='btn btn-hero'>
              Login/Register
            </Link>
          </div>
          <img src={main} alt='job hunt' className='img main-img' />
        </div>
      </main>
    </Wrapper>
  );
};

export default Landing;
