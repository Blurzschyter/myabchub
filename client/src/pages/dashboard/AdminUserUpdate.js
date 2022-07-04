import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppContext } from '../../context/appContext';
import { UserUpdateForm } from '../../components';

const AdminUserUpdate = () => {
  const { isLoading, getSingleUser, selectedUserObj, showAlert } =
    useAppContext();
  const { id } = useParams();

  // if (Object.keys(selectedUserObj).length === 0) {
  //   console.log('useEffect');
  //   console.log(selectedUserObj);
  // }

  useEffect(() => {
    getSingleUser(id);
    // setName('selectedUserObj.name');

    // const getData = async () => {
    //   await getSingleUser(id);
    //   console.log('useEffect');
    //   console.log(selectedUserObj);
    //   // setName(selectedUserObj.name);
    // };
    // getData();
  }, []);

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
    </section>
  );
};
export default AdminUserUpdate;
