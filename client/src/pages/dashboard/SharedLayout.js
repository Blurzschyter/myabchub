import { Outlet } from 'react-router-dom';
import { Header, LeftSidebar } from '../../components';

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
