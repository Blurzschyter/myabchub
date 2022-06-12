import CustomRow from '../models/CustomRow.js';
import { StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} from '../errors/index.js';
import checkPermissions from '../utils/checkPermissions.js';

const createNewCustomRow = async (req, res) => {
  // res.send('createNewCustomRow');
  const {
    rowTitle,
    hideDisplay,
    apiType,
    channelList: channelListItems,
  } = req.body;

  if (!rowTitle) {
    throw new BadRequestError('Please provide at least row title');
  }

  if (!channelListItems) {
    throw new BadRequestError('Please provide at least empty channelList');
  }

  let tempChannelList = [];
  if (channelListItems.length > 0) {
    console.log('channel list ade and tmbah data...');
  }

  const newCustomRow = await CustomRow.create({
    rowTitle,
    channelList: tempChannelList,
    createdBy: req.user.userId,
  });
  res.status(StatusCodes.CREATED).json({ newCustomRow });
};

const getAllCustomRow = async (req, res) => {
  // res.send('getAllCustomRow');
  const customRows = await CustomRow.find({}).sort('createdAt');
  const addIndexCustomRows = customRows.map((item, index) => {
    const { _id, rowTitle, hideDisplay, createdBy, channelList, createdAt } =
      item;
    return {
      _id,
      rowTitle,
      hideDisplay,
      createdBy,
      channelList,
      createdAt,
      index,
    };
  });

  res.status(StatusCodes.OK).json({
    customRows: addIndexCustomRows,
    totalCustomRows: addIndexCustomRows.length,
  });
};

const getSingleCustomRow = async (req, res) => {
  // res.send('getSingleCustomRow');
  const { id: rowId } = req.params;
  const customRow = await CustomRow.findOne({ _id: rowId });

  if (!customRow) {
    throw new NotFoundError(`No custom row with id : ${rowId} found`);
  }

  res.status(StatusCodes.OK).json({ customRow });
};

const addNewChannel = async (req, res) => {
  // res.send('addNewChannel');

  const {
    productID,
    channelID,
    channelID_6001,
    channelID_6002,
    channelID_6003,
    channelID_8601,
    title,
    posterURL,
    posterURL_ATV,
  } = req.body;
  const { id: rowId } = req.params;
  const customRow = await CustomRow.findOne({ _id: rowId });

  if (!customRow) {
    throw new NotFoundError(`No custom row with id : ${rowId} found`);
  }

  const singleChannel = {
    productID,
    channelID,
    channelID_6001,
    channelID_6002,
    channelID_6003,
    channelID_8601,
    title,
    posterURL,
    posterURL_ATV,
  };

  const aaa = customRow.channelList.length;
  let bbb = customRow.channelList;
  bbb = [...bbb, singleChannel];
  customRow.channelList = bbb;
  const xxx = await customRow.save();

  res.status(StatusCodes.OK).json({ customRow });
};

export {
  createNewCustomRow,
  getAllCustomRow,
  addNewChannel,
  getSingleCustomRow,
};
