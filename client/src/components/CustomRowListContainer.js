import { useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/JobsContainer';
import Loading from './Loading';
import CustomRowItem from '../components/CustomRowItem.js';

const CustomRowListContainer = () => {
  const { isLoading, customRows, totalCustomRows, getCustomRows } =
    useAppContext();

  useEffect(() => {
    getCustomRows();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  if (customRows.length === 0) {
    return (
      <Wrapper>
        <h2>No custom rows to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalCustomRows} custom row{customRows.length > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {customRows.map((item) => {
          return <CustomRowItem key={item._id} {...item} />;
        })}
      </div>
    </Wrapper>
  );
};

export default CustomRowListContainer;
