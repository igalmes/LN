const bcrypt = require('bcrypt');
const { sequelize, Usuario } = require('./models');

(async () => {
  await sequelize.sync();

  const password = '1234'; // la contraseña del usuario temporal
  const hash = await bcrypt.hash(password, 10);

  await Usuario.update(
    { password: hash },
    { where: { email: 'admin@taller.com' } }
  );

  console.log('Contraseña hasheada correctamente');
  process.exit();
})();
