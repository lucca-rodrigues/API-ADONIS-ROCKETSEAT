'use strict'

const crypto = require('crypto')
const User = use('App/Models/User')

class ResetPasswordController {
  async store ({ request }){
    try {
      const email = request.input('email')
      const user = await User.findByOrFail('email', email)

      user.token = crypto.randomBytes(10).toString('hex') // Gera um token Hexadecimal
      user.token_created_at = new Date() // Salva a data de criação do Token

      await user.save()
    } catch (error) {
      return Response.status(error.status).send({ error: { message: 'Ops! Algo de errado não esta certo!'}})
    }
  }

}

module.exports = ResetPasswordController
