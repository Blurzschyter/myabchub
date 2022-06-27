import mssql from 'mssql';
import config from './sqlconfig.js';

// const config = {
//   user: 'sa',
//   password: 'Str0ngPa2906w0rd',
//   server: 'localhost',
//   database: 'nizar_db',
//   options: {
//     trustServerCertificate: true,
//   },
//   port: 1433,
// };

const connectMssqlDB = () => {
  return mssql.connect(config);
};

export default connectMssqlDB;
