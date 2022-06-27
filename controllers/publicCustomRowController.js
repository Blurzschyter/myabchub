import CustomRow from '../models/CustomRow.js';
import { StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} from '../errors/index.js';
import sql from 'mssql';
import config from '../db/sqlconfig.js';

const getDynamicPlaytvHomeMSSQL = async (req, res) => {
  let finalUrl = '';
  if (process.env.NODE_ENV !== 'PRODUCTION') {
    finalUrl = 'http://localhost:5000';
  } else {
    finalUrl = 'https://myabchub.herokuapp.com';
  }
  /*
  const addIndexCustomRows = result.map((item) => {
    const { rowTitle, hideDisplay, channelList, apiType, indexLocation } = item;

    const newChannelList = channelList.map((channel, index) => {
      const {
        title,
        posterURL,
        posterURL_ATV,
        productID,
        channelID,
        channelID_6001,
        channelID_6002,
        channelID_6003,
        channelID_8601,
      } = channel;
      return {
        index: `${index + 1}`,
        productID,
        channelID,
        channelID_6001,
        channelID_6002,
        channelID_6003,
        channelID_8601,
        title,
        posterURL: `${finalUrl}${posterURL}`,
        posterURL_ATV: `${finalUrl}${posterURL_ATV}`,
      };
    });

    return {
      index: indexLocation,
      rowTitle,
      hideDisplay,
      apiType,
      channelList: newChannelList,
    };
  });
*/

  let pool = await sql.connect(config);
  let customrows = await pool
    .request()
    .query(
      'SELECT customrows.customrow_id, customrows.rowTitle, customrows.hideDisplay, customrows.indexLocation, customrows.apiType, customrows.createdAt, customrows.updatedAt, posters.poster_id, posters.title, posters.posterURL, posters.posterURL_ATV, posters.productID, posters.channelID, posters.channelID_6001, posters.channelID_6002, posters.channelID_6003, posters.channelID_8601 FROM customrows LEFT JOIN posters ON customrows.customrow_id = posters.customrow_id'
    );

  let counter = 1;
  const remapping = customrows.recordsets[0].reduce(
    (
      r,
      {
        customrow_id: _id,
        rowTitle,
        hideDisplay,
        indexLocation,
        apiType,
        createdAt,
        updatedAt,
        ...object
      }
    ) => {
      var temp = r.find((o) => o._id === _id);
      if (!temp) {
        r.push(
          (temp = {
            // _id,
            index: indexLocation,
            rowTitle,
            hideDisplay,
            apiType,
            // createdAt,
            // updatedAt,
            channelList: [],
          })
        );
      }
      if (object.poster_id !== null) {
        const tempObj = {
          index: `${counter}`,
          productID: object.productID,
          channelID: object.channelID,
          channelID_6001: object.channelID_6001,
          channelID_6002: object.channelID_6002,
          channelID_6003: object.channelID_6003,
          channelID_8601: object.channelID_8601,
          title: object.title,
          posterURL: `${finalUrl}${object.posterURL}`,
          posterURL_ATV: `${finalUrl}${object.posterURL_ATV}`,
          // _id: object.poster_id,
        };
        counter++;
        temp.channelList.push(tempObj);
      }
      return r;
    },
    []
  );

  //sorting by indexLocatiton
  const sortRemapping = remapping.sort(function (a, b) {
    // return a.indexLocation - b.indexLocation;
    return a.index - b.index;
  }); // Sort youngest first

  res.status(StatusCodes.OK).json({
    totalMaxRow: remapping.length,
    customPlayTVHomeRow: sortRemapping,
  });

  // res
  //   .status(StatusCodes.OK)
  //   .json({ totalMaxRow: 5, customPlayTVHomeRow: addIndexCustomRows });
};

const getDynamicPlaytvHome = async (req, res) => {
  // res.send('getDynamicPlaytvHome');
  let result = await CustomRow.find({});

  let finalUrl = '';
  if (process.env.NODE_ENV !== 'PRODUCTION') {
    finalUrl = 'http://localhost:5000';
  } else {
    finalUrl = 'https://myabchub.herokuapp.com';
  }

  const addIndexCustomRows = result.map((item) => {
    const { rowTitle, hideDisplay, channelList, apiType, indexLocation } = item;

    const newChannelList = channelList.map((channel, index) => {
      const {
        title,
        posterURL,
        posterURL_ATV,
        productID,
        channelID,
        channelID_6001,
        channelID_6002,
        channelID_6003,
        channelID_8601,
      } = channel;
      return {
        index: `${index + 1}`,
        productID,
        channelID,
        channelID_6001,
        channelID_6002,
        channelID_6003,
        channelID_8601,
        title,
        posterURL: `${finalUrl}${posterURL}`,
        posterURL_ATV: `${finalUrl}${posterURL_ATV}`,
      };
    });

    return {
      index: indexLocation,
      rowTitle,
      hideDisplay,
      apiType,
      channelList: newChannelList,
    };
  });

  res
    .status(StatusCodes.OK)
    .json({ totalMaxRow: 5, customPlayTVHomeRow: addIndexCustomRows });
};

export { getDynamicPlaytvHome, getDynamicPlaytvHomeMSSQL };
