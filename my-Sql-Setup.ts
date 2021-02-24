import { BaseDatabase } from "./src/data.ts/BaseDatabase"

export class MySqlSetup extends BaseDatabase{
    public async createTable(): Promise<void> {
    try {
        
        await BaseDatabase.connection.raw(`
            CREATE TABLE IF NOT EXISTS USER_PINTERPETS (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                nickname VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
               
            )
        `)
        
        console.log("MySql setup completed!")

        } catch (error) {
            console.log(error)
        }finally{
            BaseDatabase.connection.destroy()
        } 
    }
}

new MySqlSetup().createTable()