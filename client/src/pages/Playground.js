import BaseTable, { Column } from 'react-base-table';
import 'react-base-table/styles.css';
import React, { useEffect, useRef, useState } from 'react';

const generateColumns = (count = 10, prefix = 'column-', props) =>
  new Array(count).fill(0).map((column, columnIndex) => ({
    ...props,
    key: `${prefix}${columnIndex}`,
    dataKey: `${prefix}${columnIndex}`,
    title: `Column ${columnIndex}`,
    width: 150,
  }));

const generateData = (columns, count = 200, prefix = 'row-') =>
  new Array(count).fill(0).map((row, rowIndex) => {
    return columns.reduce(
      (rowData, column, columnIndex) => {
        rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`;
        return rowData;
      },
      {
        id: `${prefix}${rowIndex}`,
        parentId: null,
      }
    );
  });

const mockaroo = [
  {
    id: 1,
    appName: 'Bitchip',
    email: 'iarrell0@pinterest.com',
    bundleId: 'au.org.auda.Stim',
  },
  {
    id: 2,
    appName: 'Tresom',
    email: 'mmartynikhin1@statcounter.com',
    bundleId: 'com.pcworld.Kanlam',
  },
  {
    id: 3,
    appName: 'Pannier',
    email: 'scapinetti2@abc.net.au',
    bundleId: 'com.freewebs.Ventosanzap',
  },
  {
    id: 4,
    appName: 'Sonair',
    email: 'tbeauman3@edublogs.org',
    bundleId: 'edu.berkeley.Biodex',
  },
  {
    id: 5,
    appName: 'Lotlux',
    email: 'bdunsire4@friendfeed.com',
    bundleId: 'edu.cmu.Gembucket',
  },
  {
    id: 6,
    appName: 'Cardify',
    email: 'pwyllt5@tinypic.com',
    bundleId: 'gov.nih.Tampflex',
  },
];

const mockarooCols = [
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 0,
    flexGrow: 1,
  },
  {
    dataKey: 'appName',
    key: 'appName',
    title: 'App Name',
    width: 0,
    flexGrow: 2,
  },
  {
    dataKey: 'email',
    key: 'email',
    title: 'Email',
    width: 0,
    flexGrow: 3,
  },
  {
    dataKey: 'bundleId',
    key: 'bundleId',
    title: 'Bundle ID',
    width: 0,
    flexGrow: 4,
  },
];

const columns = generateColumns(3);
const data = generateData(columns, 6);

const Playground = () => {
  // console.log(`colums`);
  // console.log(columns);
  // console.log(`data`);
  // console.log(data);

  const [size, setSize] = useState(600);
  const ref = useRef(null);

  useEffect(() => {
    // console.log('width', ref.current.offsetWidth);
    setSize(ref.current.offsetWidth - 35);
  }, []);

  return (
    <section role='main' className='content-body'>
      <header className='page-header'>
        <h2>Testing 1.2..3...</h2>
      </header>
      <hr className='solid mt-3 opacity-4' />
      <div className='row'>
        <div className='col-md-12' style={{ backgroundColor: 'red' }} ref={ref}>
          <BaseTable
            data={mockaroo}
            columns={mockarooCols}
            width={size}
            height={400}
          ></BaseTable>
        </div>
      </div>
    </section>
  );
};
export default Playground;
