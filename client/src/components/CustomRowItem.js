import moment from 'moment';
import { FaCalendarAlt, FaCog, FaImages, FaListAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/Job';
import JobInfo from './JobInfo';

const CustomRowItem = ({
  rowTitle,
  createdAt,
  index,
  channelList,
  hideDisplay,
}) => {
  let date = moment(createdAt);
  date = date.format('MMM Do, YYYY');

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{rowTitle.charAt(0)}</div>
        <div className='info'>
          <h5>{rowTitle}</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing el...</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaListAlt />} text={`Row Location: ${index + 1}`} />
          <JobInfo icon={<FaListAlt />} text={`Row Location: ${index + 1}`} />
          <JobInfo icon={<FaListAlt />} text={`Row Location: ${index + 1}`} />
          <JobInfo icon={<FaListAlt />} text={`Row Location: ${index + 1}`} />
          <JobInfo icon={<FaListAlt />} text={`Row Location: ${index + 1}`} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo
            icon={<FaImages />}
            text={`Total Images: ${channelList.length}`}
          />
          {/* <div className={`status ${status}`}>{status}</div> */}
          <div className={`status hideDisplay-${hideDisplay}`}>
            {hideDisplay ? 'Hidden' : 'Displayed'}
          </div>
        </div>
        <footer>
          <div className='actions'>
            <Link
              to='/add-job'
              className='btn configure-btn'
              onClick={() => console.log('configure presssed')}
            >
              Configure
            </Link>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default CustomRowItem;
