import {
  AddCustomRowContainer,
  CustomRowListContainer,
  CustomRowTable,
} from '../../components';
import { useAppContext } from '../../context/appContext';

const CustomRow = () => {
  const { user } = useAppContext();

  return (
    <section role='main' className='content-body'>
      <header className='page-header'>
        <h2>Custom Row</h2>
      </header>
      {user.role === 'admin' && <AddCustomRowContainer />}
      <hr className='solid mt-3 opacity-4' />
      {/* <CustomRowListContainer /> */}
      <CustomRowTable />
    </section>
  );
};
export default CustomRow;
