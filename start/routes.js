'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store')
Route.get('users', 'UserController.index')
Route.post('sessions', 'SessionController.store')

Route.post('passwords', 'ResetPasswordController.store')
Route.put('passwords', 'ResetPasswordController.update')

Route.post('files', 'FileController.store')
