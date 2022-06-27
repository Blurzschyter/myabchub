import mongoose from 'mongoose';

const ChannelSchema = mongoose.Schema({
  title: { type: String, required: true },
  posterURL: { type: String, required: true },
  posterURL_ATV: { type: String, required: true },
  productID: { type: String, required: true },
  channelID: { type: String, required: true },
  channelID_6001: { type: String, required: true },
  channelID_6002: { type: String, required: true },
  channelID_6003: { type: String, required: true },
  channelID_8601: { type: String, required: true },
});

const CustomRowSchema = new mongoose.Schema(
  {
    rowTitle: {
      type: String,
      required: [true, 'Please provide rowTitle'],
      maxlength: 50,
      trim: true,
    },
    indexLocation: {
      type: Number,
    },
    hideDisplay: {
      type: Boolean,
      default: true,
    },
    apiType: {
      type: String,
      maxlength: 10,
    },
    channelList: [ChannelSchema],
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('CustomRow', CustomRowSchema);
