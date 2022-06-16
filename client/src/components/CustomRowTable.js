import { useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import LoadingNew from './LoadingNew';
import moment from 'moment';
import { Link } from 'react-router-dom';

const CustomRowTable = () => {
  const { isLoading, customRows, setEditCustomRow, getCustomRows } =
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
          No custom rows list to display
        </h4>
        {/* <p>Block Widgets are perfect to show some statistics.</p> */}
      </div>
    );
  }

  return (
    <div className='row'>
      <div className='col'>
        <div className='card card-modern card-modern-table-over-header'>
          <div className='card-header'>
            <div className='card-actions'>
              <a
                href='#'
                className='card-action card-action-toggle'
                data-card-toggle
              />
            </div>
            <h2 className='card-title'>Custom Row List</h2>
          </div>
          <div className='card-body'>
            <table className='table table-responsive-md table-striped mb-0'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>apiType</th>
                  <th>Title</th>
                  <th>Total Poster</th>
                  <th>Display Status</th>
                  <th>Created At</th>
                  <th>Last Modified At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customRows.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>{item.index + 1}</td>
                      <td>{item.apiType}</td>
                      <td>{item.rowTitle}</td>
                      <td>{item.channelList.length}</td>
                      {/* <td>{item.hideDisplay ? 'Hide' : 'Show'}</td> */}
                      <td>
                        <span
                          className={
                            item.hideDisplay
                              ? `ecommerce-status failed`
                              : `ecommerce-status completed`
                          }
                        >
                          {item.hideDisplay ? 'Hide' : 'Show'}
                        </span>
                      </td>
                      <td>
                        {moment(item.createdAt).format('D[-]MMMM[-]YYYY')}
                      </td>
                      <td>
                        {moment(item.updatedAt).format('D[-]MMMM[-]YYYY')}
                      </td>
                      <td
                        className='actions'
                        // style={{
                        //   listStyleType: 'none',
                        //   display: 'flex',
                        //   justifyContent: 'center',
                        // }}
                      >
                        <Link
                          to={`/customrow/${item._id}`}
                          onClick={() => setEditCustomRow(item._id)}
                        >
                          {/* <a href> */}
                          <i className='fas fa-cog' />
                          {/* </a> */}
                        </Link>

                        {/* <a href className='delete-row'>
                          <i className='far fa-trash-alt' />
                        </a> */}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomRowTable;
