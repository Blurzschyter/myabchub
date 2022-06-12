import { Outlet } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/SharedLayout.js';
import {
  Navbar,
  BigSidebar,
  SmallSidebar,
  Header,
  LeftSidebar,
} from '../../components';

const SharedLayout = () => {
  return (
    <section className='body'>
      <Header />
      <div className='inner-wrapper'>
        <LeftSidebar />
        <Outlet />
      </div>
    </section>
  );
};
export default SharedLayout;
