import { useLocation, Link } from 'react-router-dom';
import links from '../utils/links';
import linksAdmin from '../utils/links_admin';
import { useAppContext } from '../context/appContext';

const NavLinks = ({ toggleSidebar }) => {
  const { user } = useAppContext();
  const navlinkRemapping = user.role === 'admin' ? linksAdmin : links;

  const location = useLocation();
  // console.log(`current location : ${location.pathname}`);
  return (
    <>
      {/* {console.log('nizar navlinks : ' + user.role)} */}
      {navlinkRemapping.map((link) => {
        const { text, path, id, boxicon } = link;
        // console.log(`current mapping path: ${path}`);
        return (
          <li
            key={id}
            className={location.pathname === path ? 'nav-active' : null}
          >
            <Link to={path} className='nav-link' href='#'>
              <i className={boxicon} aria-hidden='true' />
              <span>{text}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};
export default NavLinks;
