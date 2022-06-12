import { NavLink, useLocation, Link } from 'react-router-dom';
import links from '../utils/links';

const NavLinks = ({ toggleSidebar }) => {
  const location = useLocation();
  // console.log(`current location : ${location.pathname}`);
  return (
    <>
      {links.map((link) => {
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
