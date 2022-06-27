import { Link } from 'react-router-dom';
import moment from 'moment';
import { useAppContext } from '../context/appContext';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const CustomRowTableItem = ({
  _id,
  indexLocation,
  apiType,
  rowTitle,
  hideDisplay,
  channelList,
  createdAt,
  updatedAt,
}) => {
  const { setEditCustomRow, deleteRow, user } = useAppContext();

  const {
    setNodeRef,
    attributes,
    listeners,
    transition,
    transform,
    isDragging,
  } = useSortable({ id: _id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    // border: '2px solid black',
    marginBottom: 5,
    marginTop: 5,
    opacity: isDragging ? 0.5 : 1,
  };

  // return (
  //   <tr key={_id} ref={setNodeRef} style={style}>
  //     <td {...attributes} {...listeners}>
  //       <i className='fas fa-bars' />
  //     </td>
  //     <td>1</td>
  //     <td>nm01</td>
  //     <td>Lalaland</td>
  //     <td>4</td>
  //     <td>
  //       <span className='ecommerce-status completed'>Hide</span>
  //     </td>
  //     <td>12 Jun 2022</td>
  //     <td>20 Jun 2022</td>
  //     <td className='actions'>
  //       <Link to={`/all-jobs`} onClick={() => console.log('edit lala')}>
  //         <i className='fas fa-cog' />
  //       </Link>
  //     </td>
  //   </tr>
  // );

  return (
    <tr key={_id} ref={setNodeRef} style={style}>
      <td {...attributes} {...listeners}>
        <i className='fas fa-bars' />
      </td>
      <td>{indexLocation + 1}</td>
      <td>{apiType}</td>
      <td>{rowTitle}</td>
      <td>{channelList.length}</td>
      {/* <td>{item.hideDisplay ? 'Hide' : 'Show'}</td> */}
      <td>
        <span
          className={
            hideDisplay
              ? `ecommerce-status failed`
              : `ecommerce-status completed`
          }
        >
          {hideDisplay ? 'Hide' : 'Show'}
        </span>
      </td>
      <td>{moment(createdAt).format('D[-]MMMM[-]YYYY')}</td>
      <td>{moment(updatedAt).format('D[-]MMMM[-]YYYY')}</td>
      <td
        className='actions'
        // style={{
        //   listStyleType: 'none',
        //   display: 'flex',
        //   justifyContent: 'center',
        // }}
      >
        <Link to={`/customrow/${_id}`} onClick={() => setEditCustomRow(_id)}>
          {/* <a href> */}
          <i className='fas fa-cog' />
          {/* </a> */}
        </Link>
        {user.role === 'admin' && (
          <Link to={`/`} onClick={() => deleteRow(_id)}>
            {/* <a href> */}
            <i className='fas fa-trash' />
            {/* </a> */}
          </Link>
        )}

        {/* <a href className='delete-row'>
                          <i className='far fa-trash-alt' />
                        </a> */}
      </td>
    </tr>
  );
};
export default CustomRowTableItem;
