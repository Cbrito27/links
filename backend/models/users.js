import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  titulo: String,
  url: String
});

const User = mongoose.model('User', userSchema);

export default User;
