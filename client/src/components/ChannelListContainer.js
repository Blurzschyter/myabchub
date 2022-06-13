import { Channel } from '../components';
import { useAppContext } from '../context/appContext';
import LoadingNew from './LoadingNew';

const ChannelListContainer = ({ channelList, rowTitle }) => {
  const { isLoading } = useAppContext();

  if (isLoading) {
    return <LoadingNew style={{ margin: '0 auto' }} />;
  }

  if (channelList.length === 0) {
    return (
      <div className='row'>
        <h4 className='mt-0 mb-0 font-weight-bold text-dark'>
          No poster to display
        </h4>
      </div>
    );
  }

  return (
    <div className='row'>
      {/* {console.log('asds')} */}
      {/* {console.log(channelList)} */}
      {/* <Channel /> */}
      {channelList.map((channel, index) => {
        return <Channel key={channel._id} {...channel} index={index} />;
      })}
    </div>
  );
};
export default ChannelListContainer;
