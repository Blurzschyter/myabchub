import { Link } from 'react-router-dom';

const CustomRowItem = ({
  rowTitle,
  createdAt,
  index,
  channelList,
  hideDisplay,
}) => {
  return (
    <div className='col-lg-6'>
      <section
        className={`card card-featured-left card-featured-${
          hideDisplay ? 'declined' : 'primary'
        } mb-4`}
      >
        <div className='card-body'>
          <div className='widget-summary'>
            <div className='widget-summary-col widget-summary-col-icon'>
              <div
                className={`summary-icon bg-${
                  hideDisplay ? 'declined' : 'primary'
                }`}
              >
                <i className='fas fa-images' />
              </div>
            </div>
            <div className='widget-summary-col'>
              <div className='summary'>
                <h4 className='title'>
                  {hideDisplay ? 'Hidden' : 'Displayed'} | Row {index + 1}
                </h4>
                <div className='info'>
                  <strong className='amount'>{rowTitle}</strong>
                </div>
              </div>
              <div className='summary-footer'>
                {/* <a className='text-muted text-uppercase'>Configure</a> */}
                <Link
                  to='/add-job'
                  className='text-muted text-uppercase'
                  onClick={() => console.log('configure presssed')}
                >
                  Configure
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomRowItem;
