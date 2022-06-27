import CustomRow from '../models/CustomRow.js';
import { StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} from '../errors/index.js';

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

export { getDynamicPlaytvHome };
