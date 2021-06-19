import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserProfiles extends BaseSchema {
  protected tableName = 'user_profiles'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropForeign('user_id', 'user_profiles_user_id_foreign')
    })
  }
}
