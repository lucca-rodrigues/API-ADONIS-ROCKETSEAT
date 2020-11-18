'use strict'

const Route = use('Route')

Route.get('users', 'UserController.index')
Route.post('users', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store')

Route.post('passwords', 'ResetPasswordController.store')
Route.put('passwords', 'ResetPasswordController.update')

Route.get('files/:id', 'FileController.show')

Route.group(() => {
  Route.post('files', 'FileController.store')

  Route.resource('projects', 'ProjectController').apiOnly() // Cria todas as rotas automaticamente com 1 linha de código
  Route.resource('projects.tasks', 'TaskController').apiOnly() // Insere o ID do projeto na rota pois nao pode existir uma task sem um projeto
}).middleware(['auth']) // Cria um grupo de rotas que é Necessário estar autenticado para visualizar



