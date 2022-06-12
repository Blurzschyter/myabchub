import moment from 'moment';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status,
}) => {
  const { setEditJob, deleteJob } = useAppContext();

  let date = moment(createdAt);
  date = date.format('MMM Do, YYYY');

  const title = `  ${position} | ${company}`;

  return (
    <div className='col-6'>
      <section className='card mb-3'>
        <header className='card-header'>
          <h2 className='card-title'>
            <span className='badge badge-primary font-weight-bold va-middle p-2 me-e'>
              {position.charAt(0).toUpperCase()}
            </span>
            <span className='va-middle'>{title}</span>
          </h2>
        </header>
        <div className='card-body'>
          <div className='content row'>
            {/* letak content sni */}
            <div className='col-6'>
              <p className='mb-2'>
                <i className='bx bxs-navigation me-1 text-7 top-6 position-relative' />
                {jobLocation}
              </p>
              <p className='mb-2'>
                <i className='bx bxs-briefcase me-1 text-7 top-7 position-relative' />
                {jobType}
              </p>
            </div>
            <div className='col-6'>
              <p className='mb-2'>
                <i className='bx bxs-calendar me-1 text-7 top-6 position-relative' />
                {date}
              </p>
              <p className='mb-2'>
                <i className='bx bxs-label me-1 text-7 top-7 position-relative' />
                {status}
              </p>
            </div>
          </div>
        </div>
        <div className='card-footer'>
          {/* letak button kat sni */}
          <p className='m-0'>
            <Link to='/add-job'>
              <button
                onClick={() => setEditJob(_id)}
                type='button'
                className='mb-1 mt-1 me-1 btn btn-sm btn-primary'
              >
                Edit
              </button>
            </Link>
            <button
              onClick={() => deleteJob(_id)}
              type='button'
              className='mb-1 mt-1 me-1 btn btn-sm btn-danger'
            >
              Delete
            </button>
          </p>
        </div>
      </section>
    </div>
  );
};
export default Job;
