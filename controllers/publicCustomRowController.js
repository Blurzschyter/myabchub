import CustomRow from '../models/CustomRow.js';
import { StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} from '../errors/index.js';
import sql from 'mssql';
import config from '../db/sqlconfig.js';

const getDynamicPlaytvHome = async (req, res) => {
  // res.send('getDynamicPlaytvHome');
  let finalUrl = '';
  if (process.env.NODE_ENV !== 'PRODUCTION') {
    finalUrl = 'http://localhost:5000';
  } else {
    finalUrl = 'https://myabchub.herokuapp.com';
  }

  if (process.env.DATABASE_MODE === 'MONGODB') {
    let result = await CustomRow.find({});

    const addIndexCustomRows = result.map((item) => {
      const { rowTitle, hideDisplay, channelList, apiType, indexLocation } =
        item;

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
  } else {
    let pool = await sql.connect(config);
    let customrows = await pool
      .request()
      .query(
        'SELECT myhub_customrows.customrow_id, myhub_customrows.rowTitle, myhub_customrows.hideDisplay, myhub_customrows.indexLocation, myhub_customrows.apiType, myhub_customrows.createdAt, myhub_customrows.updatedAt, myhub_posters.poster_id, myhub_posters.title, myhub_posters.posterURL, myhub_posters.posterURL_ATV, myhub_posters.productID, myhub_posters.channelID, myhub_posters.channelID_6001, myhub_posters.channelID_6002, myhub_posters.channelID_6003, myhub_posters.channelID_8601 FROM myhub_customrows LEFT JOIN myhub_posters ON myhub_customrows.customrow_id = myhub_posters.customrow_id'
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
  }
};

export { getDynamicPlaytvHome };
