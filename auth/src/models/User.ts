import mongoose from 'mongoose';

interface IUser {
  email: string;
  password: string;
}

interface IUserModel extends mongoose.Model<IUserDoc> {
  build(config: IUser): IUserDoc;
}

interface IUserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (config: IUser) => new User(config);

const User = mongoose.model<IUserDoc, IUserModel>('User', userSchema);

export { User };
