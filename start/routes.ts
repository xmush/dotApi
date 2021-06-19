/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return {status : true, message : 'server is up!!'}
})

Route.get('user', 'UsersController.getAllUser')
Route.get('user/:id', 'UsersController.getSingleUser')
Route.post('user', 'UsersController.addUser')
Route.put('user/password/:id', 'UsersController.changePasswod')
Route.patch('user/profile/:id', 'UsersController.updateProfile')
Route.delete('user/delete/:id', 'UsersController.deleteUser')
