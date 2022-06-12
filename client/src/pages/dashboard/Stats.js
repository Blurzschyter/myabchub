import { useEffect } from 'react';
import { useAppContext } from '../../context/appContext';
import { StatsContainer, Loading, ChartsContainer } from '../../components';
import LoadingNew from '../../components/LoadingNew';

const Stats = () => {
  const { showStats, isLoading, monthlyApplications } = useAppContext();
  // console.log('stats page');
  useEffect(() => {
    showStats();
    // eslint-disable-next-line
    // console.log('stats page - useEffect');
  }, []);

  if (isLoading) {
    return <LoadingNew style={{ margin: '0 auto' }} />;
  }

  // return (
  //   <>
  //     <StatsContainer />
  //     {monthlyApplications.length > 0 && <ChartsContainer />}
  //   </>
  // );

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
