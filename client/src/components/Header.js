import { useAppContext } from '../context/appContext';
import portoLogo from '../assets/images/logo.png';
import myAvatar from '../assets/images/myAvatar.png';

const Header = () => {
  const { logoutUser, user } = useAppContext();

  return (
    <header className='header'>
      <div className='logo-container'>
        <a href='../4.0.0' className='logo'>
          <img src={portoLogo} width={75} height={35} alt='Porto Admin' />
        </a>
        {/* start: form small screen device */}
        <div
          className='d-md-none toggle-sidebar-left'
          data-toggle-class='sidebar-left-opened'
          data-target='html'
          data-fire-event='sidebar-left-opened'
        >
          <i className='fas fa-bars' aria-label='Toggle sidebar' />
        </div>
        {/* end: form small screen devices */}
      </div>
      {/* start: search & user box */}
      <div className='header-right'>
        <span className='separator' />
        <div id='userbox' className='userbox'>
          {/* eslint-disable-next-line */}
          <a href='#' data-bs-toggle='dropdown'>
            <figure className='profile-picture'>
              <img
                src={myAvatar}
                alt='Joseph Doe'
                className='rounded-circle'
                data-lock-picture={myAvatar}
              />
            </figure>
            <div
              className='profile-info'
              data-lock-name='John Doe'
              data-lock-email='johndoe@okler.com'
            >
              <span className='name'>{user?.name}</span>
              <span className='role'>Administrator</span>
            </div>
            <i className='fa custom-caret' />
          </a>
          <div className='dropdown-menu'>
            <ul className='list-unstyled mb-2'>
              <li className='divider' />
              {/* <li>
                <a role='menuitem' tabIndex={-1} href='pages-user-profile.html'>
                  <i className='bx bx-user-circle' /> My Profile
                </a>
              </li> */}
              <li>
                {/* eslint-disable-next-line */}
                <a role='menuitem' href='#' onClick={logoutUser}>
                  <i className='bx bx-power-off' /> Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* end: search & user box */}
    </header>
  );
};

export default Header;
