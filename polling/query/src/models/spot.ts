import mongoose from "mongoose";
import {CommentDocument} from "./comment"

interface SpotFields {
  title: string;
  username: string;
  description: string;
  upvotes: number;
  streetname: string;
  zip: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  category: string;
  pic: string;
}

export interface SpotDocument extends mongoose.Document {
  title: string;
  pic: string;
  username: string;
  description: string;
  upvotes: number;
  streetname: string;
  zip: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  category: string;
  version: number;
  comments: CommentDocument[];
}

interface SpotModel extends mongoose.Model<SpotDocument> {
  build(fields: SpotFields): SpotDocument;
}

const spotSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  upvotes: {
    type: Number,
    required: true,
  },
  streetname: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  pic: {
    type: String,
  },
  comments: [{
      type: Object,
      ref: "Comment"
  }]
});

spotSchema.methods.toJSON = function () {
  const spot = this;
  const spotObject = spot.toObject();
  delete spotObject.__v;
  spotObject.id = spotObject._id;
  delete spotObject._id;
  return spotObject;
};

spotSchema.statics.build = (fields: SpotFields) => {
  return new Spot(fields);
};

const Spot = mongoose.model<SpotDocument, SpotModel>("Spot", spotSchema);

export { Spot };