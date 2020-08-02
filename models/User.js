const {Schema, model} = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');

// schema to users collection (table)
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      },
      expDateSeconds: {
        type: String,
        required: true
      }
    }
  ]
})

// Hash password and attach to document
UserSchema.method('hashPassword', async function() {
  const salt = await bcrypt.genSaltSync(8);
  this.password = await bcrypt.hash(this.password,salt);
});

// Generate, save on document and return token
UserSchema.method('generateToken', async function() {
  const payload = {
    user: {id:this._id.toString()}
  };
  const token = await jwt.sign(payload, config.get('jwtSecret'), {expiresIn: '1h'});
  const decodedToken = await jwt.decode(token);

  // If reached max tokens count
  if(this.tokens.length > 19) {
    this.tokens.shift();
  }
  // Todo implement check token, maybe device
  this.tokens.push({token: token, expDateSeconds: decodedToken.exp});

  await this.save();
  return token;
});

module.exports = model('user', UserSchema);