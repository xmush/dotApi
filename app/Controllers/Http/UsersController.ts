import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserProfile from 'App/Models/UserProfile'
import Database from '@ioc:Adonis/Lucid/Database'
import Hash from '@ioc:Adonis/Core/Hash'
import { profiler } from 'Config/app'

export default class UsersController {

  public async addUser( { request } : HttpContextContract ) {


    const email = request.input('email')
    const username = request.input('username')
    const password = request.input('password')
    const fullname = request.input('fullname')
    const date_of_birth = request.input('date_of_birth')
    const address = request.input('address')
    const phone = request.input('phone')


    const trx = await Database.transaction()

    try {

      const user = new User

      user.username = username
      user.email = email
      user.password = password

      await user.save(trx)

      const profile = new UserProfile
      profile.user_id = user.id
      profile.fullname = fullname
      profile.date_of_birth = date_of_birth //DateTime.fromFormat(, 'dd-mm-yyyy')
      profile.address = address
      profile.phone = phone

      await profile.save(trx)

      await trx.commit()

      return {status : true, message : 'New user is created'}

    } catch (error) {

      await trx.rollback()
      return {status : false, message : error.message}

    }

  }

  public async changePasswod({ request, params } : HttpContextContract) {
    const userId = params.id
    const password = request.input('password')
    const oldPassword = request.input('old_password')


    try {

      const user = await User.find(userId)

      if(!user) {

        return {status : false, message : 'User not found'}

      }

      const isTrue = await Hash.verify(user.password, oldPassword)

      if(!isTrue) {
        return {status : false, message : 'Invalid password'}
      }

      user.password = password
      user.save()

      return {status : true, message : 'Password changed'}

    } catch (error) {

      return {status : false, message : error.message }

    }

  }

  public async updateProfile({request, params} : HttpContextContract) {
    const userId = params.id
    const fullname = request.input('fullname')
    const dateOfBirth = request.input('date_of_birth')
    const address = request.input('address')
    const phone = request.input('phone')

    try {

      const user = await User.find(userId)
      if(!user) {
        return {status : false, message : 'User not found!'}
      }
      await user.preload('profile')

      const profile = await UserProfile.find(user.profile.id)

      if(profile) {

        profile.fullname = (fullname === null || fullname === undefined) ? profile?.fullname : fullname
        profile.date_of_birth = (dateOfBirth == null || dateOfBirth == undefined) ? profile?.date_of_birth : dateOfBirth
        profile.address = (address == null || address == undefined) ? profile?.address : address
        profile.phone = (phone == null || phone == undefined) ? profile?.phone : phone
        profile.save()

        return {status : true, message : 'Update profile successfully'}

      } else {

        return {status : false, message : 'Profile is null'}

      }



    } catch (error) {

      return { status : false, message : error.message }

    }
  }

  public async deleteUser({params} : HttpContextContract) {
    const userId = params.id

    const user = await User.findOrFail(userId)

    try {

      if(user) {

        const fullUser = {...user.serialize()}

        await user.delete()

        return {status : true, message : 'User deleted', data : fullUser}

      } else {
        return {status : false, message : 'User not found'}
      }

    } catch (error) {

      return {status : false, message : error.message }

    }

  }

  public async getAllUser({} : HttpContextContract) {
    const users = await User.query().preload('profile')

    if(users) {

      const postsJSON = users.map((user) => user.serialize())

      return {status : true, message : 'Success get all data', data : postsJSON}

    }
  }

  public async getSingleUser({params} : HttpContextContract) {
    const userId = params.id
    const user = await User.find(userId)

    if(user) {
      await user?.preload('profile')

      return {status : true, message : 'Success get all data', data : user}

    }
  }

}
