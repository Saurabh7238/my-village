const bcrypt = require('bcryptjs');

async function hashPasswords() {
  const users = [
    { username: "admin", password: "password123", role: "admin" },
    { username: "user", password: "userpass", role: "user" }
  ];
  const saltRounds = 10;
  const hashedUsers = [];

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    hashedUsers.push({
      username: user.username,
      password: hashedPassword,
      role: user.role
    });
  }

  console.log(JSON.stringify(hashedUsers, null, 2));
}

hashPasswords();