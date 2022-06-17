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

  const addIndexCustomRows = result.map((item) => {
    const { rowTitle, hideDisplay, channelList, apiType, index } = item;

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
        title,
        productID,
        channelID,
        channelID_6001,
        channelID_6002,
        channelID_6003,
        channelID_8601,
        posterURL,
        posterURL_ATV,
      };
    });

    return {
      rowTitle,
      hideDisplay,
      channelList: newChannelList,
      index: index,
      apiType,
    };
  });

  res
    .status(StatusCodes.OK)
    .json({ totalMaxRow: 5, customPlayTVHomeRow: addIndexCustomRows });
};

export { getDynamicPlaytvHome };
