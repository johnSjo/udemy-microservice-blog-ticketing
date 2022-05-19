import mongoose from 'mongoose';
import { hash } from '../utils/hash';

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

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashedPassword = await hash(this.get('password'));
    this.set('password', hashedPassword);
  }

  done();
});

userSchema.statics.build = (config: IUser) => new User(config);

const User = mongoose.model<IUserDoc, IUserModel>('User', userSchema);

export { User };
