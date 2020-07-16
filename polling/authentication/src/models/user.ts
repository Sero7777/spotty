import mongoose from 'mongoose'

interface UserFields {
    email: string
    username: string
    password: string
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(fields: UserFields): UserDoc;
  }

  interface UserDoc extends mongoose.Document {
    email: string
    username: string
    password: string
  }

  const userSchema = new mongoose.Schema(
    {
      email: {
        type: String,
        required: true
      },
      username: {
          type: String,
          required: true
      },
      password: {
        type: String,
        required: true
      }
    },
    {
      toJSON: {
        transform(doc, ret) {
          ret.id = ret._id;
          delete ret._id;
          delete ret.password;
          delete ret.__v;
        }
      }
    }
  );

  userSchema.statics.build = (fields: UserFields) => {
    return new User(fields);
  };
  
  const User = mongoose.model<UserDoc, UserModel>('User', userSchema);
  
  export { User };