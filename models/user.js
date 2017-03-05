import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const SALT_FACTOR = 10

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  displayName: String,
  bio: String
})

const noop = function () {}

userSchema.pre('save', function (done) {
  if (!this.isModified('password')) {
    return done()
  }
  bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
    if (err) {
      return done(err)
    }
    bcrypt.hash(this.password, salt, noop, function (err, hasedPassword) {
      if (err) {
        return done(err)
      }
      this.password = hasedPassword
      done()
    })
  })
})

userSchema.method.checkPassword = function (guess, done) {
  bcrypt.compare(guess, this.password, function (err, isMatch) {
    done(err, isMatch)
  })
}

userSchema.method.name = function () {
  return this.displayName || this.username
}

module.exports = mongoose.model('users', userSchema)

