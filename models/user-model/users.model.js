const bcrypt = require('bcryptjs');
const userModel = require('./user.mongo');

async function saveUser(newUser) {
  try {
    bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, async (err, hash)=> {
      if(err) throw err;

      // set password to hashed
      newUser.password = hash;

      // create user in db
      await userModel.create(newUser);
    })
  })
  } catch(err) {
    console.log(err);
  }

  
};

module.exports = {
  saveUser,
}