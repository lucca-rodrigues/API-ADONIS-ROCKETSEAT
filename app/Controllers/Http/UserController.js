'use strict'
const Database = use('Database')
const User = use('App/Models/User')
class UserController {
  async index ({ response}){
   try {
      const users = User.all()
      return users

   } catch (err) {
      return response.status(err.status).send({ error: { message: 'Ops! Ocorreu um erro ao Listar os usuários!'}})
   }

  }

  async store ({ request }){
    const data = request.only(['username', 'email', 'password'])
    const addresses = request.input('addresses')

    const transaction = await Database.beginTransaction()

    const user = await User.create(data)
    await user.addresses().createMany(addresses)

    await transaction.commit()

    return user
  }
}

module.exports = UserController
