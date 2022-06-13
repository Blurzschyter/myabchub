import { useAppContext } from '../context/appContext';
import { useParams } from 'react-router-dom';

const Channel = ({ index, title, posterURL, _id }) => {
  const { id: customRowId } = useParams();
  const { deleteChannel } = useAppContext();

  return (
    <div className='col-lg-6 col-xl-6'>
      <section className='card card-horizontal mb-4'>
        <header className='card-header bg-primary col-3'>
          <img className='img-fluid' src={posterURL} alt={_id} />
        </header>
        <div className='card-body col-6'>
          <h4 className='font-weight-semibold'>{title}</h4>
          <hr className='solid short' />
          <p className='mb-1'>
            <i className='bx bx-user-circle me-1 text-4 top-3 position-relative' />
            Position : {index + 1}
          </p>
          <p className='mb-1'>
            <i className='bx bx-user-circle me-1 text-4 top-3 position-relative' />
            Product ID : 41210859 | {_id}
          </p>
          <p className='mb-1'>
            <i className='bx bx-lock me-1 text-4 top-3 position-relative' />
            Channel ID : 41210859
          </p>
          <p className='mb-1'>
            <i className='bx bx-power-off me-1 text-4 top-3 position-relative' />
            Channel Name : Unifi Sport 1
          </p>
          <hr />
          <div className='btn-group' role='group'>
            <button
              type='button'
              onClick={() => deleteChannel(_id, customRowId)}
              className='mb-1 mt-1 me-1 btn btn-sm btn-danger'
            >
              Remove
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Channel;
