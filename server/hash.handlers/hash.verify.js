const bcrypt = require('bcrypt');

const hashVerify = async () => {
  const password = 'nodejs';
  const hashPass = '$2b$10$P.8O2X9YZStGT8uhQZiCK.cmWU7pjIQ1VtwjLT5TTLv8Qa3ZOliV2'
  const isMatch = await bcrypt.compare(password, hashPass)
  console.log(isMatch);

};
hashVerify();

