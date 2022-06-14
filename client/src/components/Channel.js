import { useAppContext } from '../context/appContext';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Channel = ({
  index,
  title,
  posterURL,
  posterURL_ATV,
  _id,
  productID,
  channelID,
}) => {
  const { id: customRowId } = useParams();
  const { deleteChannel, channelsMapping } = useAppContext();

  const [isAtvImg, setIsAtvImg] = useState(false);
  const [mainImg, setMainImg] = useState('');

  useEffect(() => {
    setMainImg(posterURL);
  }, [posterURL]);

  const handleImgSwitch = (event) => {
    console.log(`image selected is ${event}`);
    if (event === 'ott') {
      setMainImg(posterURL);
      setIsAtvImg(false);
    } else {
      setMainImg(posterURL_ATV);
      setIsAtvImg(true);
    }
  };

  return (
    <div className='col-lg-6 col-xl-6'>
      <section className='card card-horizontal mb-4'>
        <header className='card-header bg-img-poster col-3'>
          <img className='img-fluid' src={mainImg} alt={_id} />
          <div className='btn-group d-flex top-10' role='group'>
            <button
              className={`btn btn-xs w-100 ${
                !isAtvImg ? 'btn-primary' : 'btn-default'
              }`}
              type='button'
              onClick={() => handleImgSwitch('ott')}
            >
              OTT
            </button>
            <button
              className={`btn btn-xs w-100 ${
                isAtvImg ? 'btn-primary' : 'btn-default'
              }`}
              type='button'
              onClick={() => handleImgSwitch('atv')}
            >
              ATV
            </button>
          </div>
        </header>
        <div className='card-body col-6'>
          <h4 className='font-weight-semibold'>{title}</h4>
          <hr className='solid short' />
          <p className='mb-1'>
            <i className='bx bxs-grid-alt me-1 text-4 top-3 position-relative' />
            Position : {index + 1}
          </p>
          <p className='mb-1'>
            <i className='bx bx-purchase-tag me-1 text-4 top-3 position-relative' />
            Product ID : {productID}
          </p>
          <p className='mb-1'>
            <i className='bx bxs-tv me-1 text-4 top-3 position-relative' />
            Channel ID : {channelID}
          </p>
          <p className='mb-1'>
            <i className='bx bx-tv me-1 text-4 top-3 position-relative' />
            Channel Name : {channelsMapping[channelID] || 'undefined'}
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
