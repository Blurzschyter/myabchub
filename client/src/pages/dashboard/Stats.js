import { useEffect } from 'react';
import { useAppContext } from '../../context/appContext';
import { StatsContainer, LoadingNew, ChartsContainer } from '../../components';

const Stats = () => {
  const { showStats, isLoading, monthlyApplications } = useAppContext();
  // console.log('stats page.');
  useEffect(() => {
    showStats();
    // console.log('stats page - useEffect');
  }, []); /* eslint-disable-line */

  if (isLoading) {
    return <LoadingNew style={{ margin: '0 auto' }} />;
  }

  return (
    <section role='main' className='content-body'>
      <header className='page-header'>
        <h2>Stats</h2>
      </header>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </section>
  );
};
export default Stats;
