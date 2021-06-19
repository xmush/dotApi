import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne, beforeSave } from '@ioc:Adonis/Lucid/Orm'
import UserProfile from 'App/Models/UserProfile'
import Hash from '@ioc:Adonis/Core/Hash'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public username: string

  @column({ serializeAs : null })
  public password: string

  @hasOne(() => UserProfile, {
    foreignKey: 'user_id',
  })
  public profile: HasOne<typeof UserProfile>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}
