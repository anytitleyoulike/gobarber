const { User } = require('../models');

class SessionController {
  create (req, res) {
    return res.render('auth/signin');
  }

  async store (req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log('usuario nao encontrado');
      return res.redirect('/');
    }

    if (!(await user.checkPassword(password))) {
      console.log('senha incorreta');
      return res.redirect('/');
    }

    return res.redirect('/app/dashboard');
  }
}

module.exports = new SessionController();
