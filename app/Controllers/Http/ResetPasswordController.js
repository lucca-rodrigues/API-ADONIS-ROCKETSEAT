'use strict'

const crypto = require('crypto')
const User = use('App/Models/User')
const Mail = use('Mail')
const moment = require('moment')

class ResetPasswordController {
  async store ({ request, response }){
    try {
      const email = request.input('email')
      const user = await User.findByOrFail('email', email)

      user.token = crypto.randomBytes(10).toString('hex') // Gera um token Hexadecimal
      user.token_created_at = new Date() // Salva a data de criação do Token

      await user.save()

      await Mail.send(
        ['emails.reset_password'],
        {email, token: user.token, link: `${request.input('redirect_url')}?token=${user.token}`},
        message => {
          message
          .to(user.email)
          .from('contato.luccarodrigues@gmail.com', 'Lucas | Rocketseat')
          .subject('Recuperação de senha')
        }
      )
      // return response.status(200).send({ message: 'Solicitação de senha realizada com sucesso!'})
    } catch (error) {
        return response.status(error.status).send({ error: { message: 'Ops! Algo de errado não esta certo!'}})
    }
  }

  async update ({ request, response }){
    try {
      const { token, password } = request.all()
      const user = await User.findByOrFail('token', token)

      const tokenExpired = moment().subtract('2', 'days').isAfter(user.token_created_at)
      // Compara se a data do token é anterior a 2 dias

      if (tokenExpired) {
        return response.status(401).send({ error: { message: 'O token de recuperação está expirado.' } })
      }

      user.token = null
      user.token_created_at = null
      user.password = password

      await user.save()

    } catch (error) {
      return response.status(error.status).send({ error: { message: 'Ops! Ocorreu um erro ao alterar a senha!'}})
    }
  }
}

module.exports = ResetPasswordController
