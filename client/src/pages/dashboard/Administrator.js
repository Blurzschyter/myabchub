import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  AddCustomRowContainer,
  CustomRowTable,
  LoadingNew,
} from '../../components';
import { useAppContext } from '../../context/appContext';

const Administrator = () => {
  const { users, getUsers, isLoading } = useAppContext();

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <LoadingNew style={{ margin: '0 auto' }} />;
  }

  if (users.length === 0) {
    return (
      <section role='main' className='content-body'>
        <header className='page-header'>
          <h2>Administrator</h2>
        </header>
        <div>
          <h4 className='mt-0 mb-0 font-weight-bold text-dark'>
            No user list to display
          </h4>
          {/* <p>Block Widgets are perfect to show some statistics.</p> */}
        </div>
        <hr className='solid mt-3 opacity-4' />
      </section>
    );
  }

  return (
    <section role='main' className='content-body'>
      <header className='page-header'>
        <h2>Administrator</h2>
      </header>
      <div className='row'>
        <div className='col-lg-12'>
          <section className='card'>
            <header className='card-header'>
              <h2 className='card-title'>User Management</h2>
              {/* <p className='card-subtitle'>
                This is an example of form with multiple block columns.
              </p> */}
            </header>
            <div className='card-body'>
              <table className='table table-responsive-md table-striped mb-0'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Configuration</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((item) => {
                    return (
                      <tr key={item._id}>
                        <td>
                          <i className='fas fa-bars' />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>
                          <i
                            className='fas fa-user-secret'
                            style={{ marginRight: '10px' }}
                          />
                          {item.role}
                        </td>
                        <td className='actions'>
                          <Link
                            to={`/user/${item._id}`}
                            // onClick={() => console.log('action press')}
                            className='delete-row'
                          >
                            <i className='far fa-edit' />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
      <hr className='solid mt-3 opacity-4' />
    </section>
  );
};
export default Administrator;
