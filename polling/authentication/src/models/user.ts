import mongoose from "mongoose";
import bcrypt from "bcrypt";

interface UserFields {
  email: string;
  username: string;
  password: string;
}

interface UserDocument extends mongoose.Document {
    email: string;
    username: string;
    password: string;
  }

interface UserModel extends mongoose.Model<UserDocument> {
  build(fields: UserFields): UserDocument;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  }
);

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.__v
    userObject.id = userObject.__id
    delete userObject.__id
}

userSchema.statics.build = (fields: UserFields) => {
  return new User(fields);
};

userSchema.pre("save", async function (this: UserDocument, next: any) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  next();
});

const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export { User };
