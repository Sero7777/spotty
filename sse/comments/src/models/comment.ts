import mongoose from "mongoose";
import { SpotDocument } from "./spot";

interface CommentFields {
  username: string;
  spot: SpotDocument;
  content: string;
}

interface CommentDocument extends mongoose.Document {
  username: string;
  spot: SpotDocument;
  content: string;
}

interface CommentModel extends mongoose.Model<CommentDocument> {
  build(fields: CommentFields): CommentDocument;
}

const commentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  spot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Spot",
  },
});

commentSchema.methods.toJSON = function () {
  const comment = this;
  const commentObject = comment.toObject();
  delete commentObject.__v;
  commentObject.id = commentObject._id;
  delete commentObject._id;
  return commentObject
};

commentSchema.statics.build = (fields: CommentFields) => {
  return new Comment(fields);
};

const Comment = mongoose.model<CommentDocument, CommentModel>(
  "Comment",
  commentSchema
);

const isValidId = (mongoId:string) => mongoose.Types.ObjectId.isValid(mongoId)

export { Comment, isValidId };
