import {
  ChannelListContainer,
  AddChannelFormContainer,
} from '../../components';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppContext } from '../../context/appContext';
import { LoadingNew } from '../../components';

const EditCustomRow = () => {
  const { isLoading, getSingleCustomRow, selectedCustomRowObj } =
    useAppContext();
  const { id } = useParams();

  useEffect(() => {
    getSingleCustomRow(id);
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <LoadingNew style={{ margin: '0 auto' }} />;
  }

  if (Object.keys(selectedCustomRowObj).length === 0) {
    return (
      <section role='main' className='content-body'>
        <header className='page-header'>
          <h2>Configure Custom Row</h2>
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
        <h2>Configure Custom Row</h2>
      </header>
      <AddChannelFormContainer customRowId={id} />
      <h2>Poster Listing</h2>
      <hr className='solid mt-3 opacity-4' />
      <div className='row'>
        {/* {console.log(selectedCustomRowObj)} */}
        <ChannelListContainer {...selectedCustomRowObj} />
      </div>
    </section>
  );
};
export default EditCustomRow;
