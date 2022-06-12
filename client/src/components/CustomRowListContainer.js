import { useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import CustomRowItem from '../components/CustomRowItem.js';
import LoadingNew from './LoadingNew';

const CustomRowListContainer = () => {
  const { isLoading, customRows, totalCustomRows, getCustomRows } =
    useAppContext();

  useEffect(() => {
    getCustomRows();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <LoadingNew style={{ margin: '0 auto' }} />;
  }

  if (customRows.length === 0) {
    return (
      <div>
        <h4 className='mt-0 mb-0 font-weight-bold text-dark'>
          No custom rows to display
        </h4>
        {/* <p>Block Widgets are perfect to show some statistics.</p> */}
      </div>
    );
  }

  return (
    <div>
      <h4 className='mt-0 mb-10 font-weight-bold text-dark'>
        {totalCustomRows} custom row{customRows.length > 1 && 's'} found
      </h4>
      <div className='row'>
        {customRows.map((item) => {
          return <CustomRowItem key={item._id} {...item} />;
        })}
      </div>
    </div>
  );
};

export default CustomRowListContainer;
