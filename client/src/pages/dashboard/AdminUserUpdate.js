import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppContext } from '../../context/appContext';
import {
  UserUpdateForm,
  UserResetPasswordForm,
  LoadingNew,
} from '../../components';

const AdminUserUpdate = () => {
  const { getSingleUser, selectedUserObj, isLoading } = useAppContext();
  const { id } = useParams();

  useEffect(() => {
    getSingleUser(id);
    // eslint-disable-next-line
  }, []);
  console.log(selectedUserObj);
  if (isLoading) {
    return <LoadingNew style={{ margin: '0 auto' }} />;
  }

  if (Object.keys(selectedUserObj).length === 0) {
    return (
      <section role='main' className='content-body'>
        <header className='page-header'>
          <h2>User Details</h2>
        </header>
        <h2>No data to display</h2>
        <hr className='solid mt-3 opacity-4' />
        <div className='row'></div>
      </section>
    );
  }

  return (
    <section role='main' className='content-body'>
      <header className='page-header'>
        <h2>User Details</h2>
      </header>
      <hr className='solid mt-3 opacity-4' />
      <UserUpdateForm selectedUserObj={selectedUserObj} />
      <hr className='solid mt-3 opacity-4' />
      <UserResetPasswordForm selectedUserObj={selectedUserObj} />
    </section>
  );
};
export default AdminUserUpdate;
