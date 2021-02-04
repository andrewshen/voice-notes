const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  bcrypt.hash(this.password, 10, (err, encrypted) => {
    // hash password
    if (err) {
      return next(err); // return error
    }
    this.password = encrypted;
    next();
  });
});

UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, same) => {
    if (err) {
      return cb(err);
    } else {
      if (!same) {
        return cb(null, same);
      }
      return cb(null, this);
    }
  });
};

module.exports = mongoose.model('User', UserSchema);
