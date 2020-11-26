'use strict'

const User = use('App/Models/User')
class UserController {
  async index ({ request , response}){
   try {
      const data = request.all()
      return data

   } catch (err) {
      return response.status(err.status).send({ error: { message: 'Ops! Ocorreu um erro ao Listar os usuários!'}})
   }

  }

  async store ({ request }){
    const data = request.only(['username', 'email', 'password'])
    const addresses = request.input('addresses')

    const user = await User.create(data)
    await user.addresses().createMany(addresses)

    return user
  }
}

module.exports = UserController
