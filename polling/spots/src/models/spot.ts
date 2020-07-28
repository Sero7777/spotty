import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface SpotFields {
  title: string;
  username: string;
  description: string;
  rating: number;
  streetname: string;
  zip: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  category: string;
  pic: string;
}

interface SpotDocument extends mongoose.Document {
  title: string;
  pic: string;
  username: string;
  description: string;
  rating: number;
  streetname: string;
  zip: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  category: string;
  version: number;
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
  rating: {
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
});

spotSchema.set("versionKey", "version");
spotSchema.plugin(updateIfCurrentPlugin);

spotSchema.methods.toJSON = function () {
  const spot = this;
  const spotObject = spot.toObject();
  delete spotObject.__v;
  spotObject.id = spotObject._id;
  delete spotObject._id;
  return spotObject
};

spotSchema.statics.build = (fields: SpotFields) => {
  return new Spot(fields);
};

const Spot = mongoose.model<SpotDocument, SpotModel>("Spot", spotSchema);

export { Spot };
