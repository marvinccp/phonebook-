const bcrypt = require('bcrypt')

const hashPassword = async () =>{
  const password = 'nodejs';
  const hashPass = await  bcrypt.hash(password, 10);
  console.log(hashPass);
  return hashPass;
}
hashPassword()
