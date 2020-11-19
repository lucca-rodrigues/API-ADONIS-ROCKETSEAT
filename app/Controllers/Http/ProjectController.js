'use strict'

const Project = use('App/Models/Project')

class ProjectController {

  //GET projects
  async index ({ request }) {
    const { page } = request.get()
    const projects = await Project.query().with('user').paginate(page)
    return projects
  }

  //POST projects

  async store ({ request, auth }) {
    const data = request.only(['title', 'description'])

    const project = await Project.create({ ...data, user_id: auth.user.id })

    return project
  }

  //GET projects/:id

  async show ({ params }) {
    const project = await Project.findOrFail(params.id)

    await project.load('user')
    await project.load('tasks')

    return project
  }

  //PUT or PATCH projects/:id

  async update ({ params, request }) {
    const project = await Project.findOrFail(params.id)
    const data = request.only(['title', 'description'])

    project.merge(data)

    await project.save()

    return project
  }

  //DELETE projects/:id

  async destroy ({ params, response }) {
    try {
      const project = await Project.findOrFail(params.id)

      await project.delete()

      return response.status(200).send({message: 'Tarefa removida com sucesso!'})

    } catch (error) {
        return response.status(error.status).send({ error: { message: 'Ops! Ocorreu um erro ao remover esta tarefa!'}})
    }
  }
}

module.exports = ProjectController
