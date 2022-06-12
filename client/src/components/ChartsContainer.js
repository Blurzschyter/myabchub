// import BarChart from './BarChart';
// import AreaChart from './AreaChart';
// import { useAppContext } from '../context/appContext';
import { useState } from 'react';

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  // const { monthlyApplications: data } = useAppContext();

  return (
    <>
      <h4
        className='mt-0 mb-0 font-weight-bold text-dark'
        style={{ textAlign: 'center' }}
      >
        Monthly Applications
      </h4>
      <p
        className='mb-4'
        style={{ textAlign: 'center', cursor: 'pointer' }}
        onClick={() => setBarChart(!barChart)}
      >
        {barChart ? 'Area Chart' : 'Bar Chart'}
        {/* temporary disable recharts here.. */}
        {/* {barChart ? <BarChart data={data} /> : <AreaChart data={data} />} */}
      </p>
    </>
  );
};
export default ChartsContainer;
