import NavLinks from './NavLinks';

const LeftSidebar = () => {
  return (
    <aside id='sidebar-left' className='sidebar-left'>
      <div className='sidebar-header'>
        <div className='sidebar-title'>Navigation</div>
        <div
          className='sidebar-toggle d-none d-md-block'
          data-toggle-class='sidebar-left-collapsed'
          data-target='html'
          data-fire-event='sidebar-left-toggle'
        >
          <i className='fas fa-bars' aria-label='Toggle sidebar' />
        </div>
      </div>
      <div className='nano'>
        <div className='nano-content'>
          <nav id='menu' className='nav-main' role='navigation'>
            <ul className='nav nav-main'>
              <NavLinks />
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
};
export default LeftSidebar;
