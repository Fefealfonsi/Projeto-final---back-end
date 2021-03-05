import { BaseDatabase } from "./BaseDatabase";
import { User } from "../business/entities/User";
import { CustomError } from "../business/error/CustomError";

export class UserDatabase extends BaseDatabase {

   private static TABLE_NAME = "USER_PINTERPETS";

   private static toUserModel(user: any): User {
      return new User(
         user.id,
         user.name,
         user.email,
         user.nickname,
         user.password
         
      );
   }

   public async createUser(
      id: string,
      name: string,
      email: string,
      nickname: string,
      password: string
      
   ): Promise<void> {
      try {
         await BaseDatabase.connection.raw(`
         INSERT INTO ${UserDatabase.TABLE_NAME} (id, name, email,nickname, password)
         VALUES ("${id}","${name}","${email}","${nickname}","${password}");
        `)

        

      } catch (error) {
         throw new CustomError(500, ` E-mail '${email}' or nickname '${nickname}' already exists`);
      }
   }

   public async getUserByEmail(email: string): Promise<User> {
      try {
         const result = await BaseDatabase.connection.raw(`
         SELECT * FROM ${UserDatabase.TABLE_NAME}
         WHERE email = "${email}";
         `)
           

         return UserDatabase.toUserModel(result[0][0]);
      } catch (error) {
         
         throw new CustomError(500, "An unexpected error ocurred ");
      }
   }
}