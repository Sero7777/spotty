import mongoose from "mongoose";

interface CommentFields {
    username: string;
    content: string;
}

export interface CommentDocument extends mongoose.Document {
    username: string;
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
});

commentSchema.methods.toJSON = function () {
  const comment = this;
  const commentObject = comment.toObject();
  delete commentObject.__v;
  commentObject.id = commentObject._id;
  delete commentObject._id;
  return commentObject;
};

commentSchema.statics.build = (fields: CommentFields) => {
  return new Comment(fields);
};

const Comment = mongoose.model<CommentDocument, CommentModel>(
  "Comment",
  commentSchema
);

export { Comment };
