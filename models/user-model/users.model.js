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
      });
    })
  } catch(err) {
    console.log(err);
  }
};

async function getUser(id) {
  try{
    return await userModel.findById(id);
  } catch(err) {
    console.log(`Couldn't get user: ${err.message}`);
  }
}

module.exports = {
  saveUser,
  getUser,
}