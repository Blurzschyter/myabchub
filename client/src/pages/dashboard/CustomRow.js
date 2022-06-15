import {
  AddCustomRowContainer,
  CustomRowListContainer,
  CustomRowTable,
} from '../../components';

const CustomRow = () => {
  return (
    <section role='main' className='content-body'>
      <header className='page-header'>
        <h2>Custom Row</h2>
      </header>
      <AddCustomRowContainer />
      <hr className='solid mt-3 opacity-4' />
      {/* <CustomRowListContainer /> */}
      <CustomRowTable />
    </section>
  );
};
export default CustomRow;
