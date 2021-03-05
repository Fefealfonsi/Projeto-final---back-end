import { BaseDatabase } from "./src/data/BaseDatabase"

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

        await BaseDatabase.connection.raw(`
            CREATE TABLE IF NOT EXISTS IMAGE_PINTERPETS (
                id VARCHAR(255) PRIMARY KEY,
                subtitle VARCHAR(255) NOT NULL,
                author VARCHAR(255) NOT NULL ,
                date DATE NOT NULL,
                file VARCHAR(255) NOT NULL,
                collection VARCHAR(255) NOT NULL,
                FOREIGN KEY (author) REFERENCES USER_PINTERPETS(id)
            )
        `)

        await BaseDatabase.connection.raw(`
        CREATE TABLE IF NOT EXISTS TAGS_PINTERPETS (
            id INT PRIMARY KEY AUTO_INCREMENT,
            tag VARCHAR(255) NOT NULL
            )
        `)
        await BaseDatabase.connection.raw(`
        CREATE TABLE IF NOT EXISTS IMAGE_TAGS_PINTERPETS (
            image_id  VARCHAR(255) NOT NULL,
            tag_id INT NOT NULL,
            FOREIGN KEY (image_id) REFERENCES IMAGE_PINTERPETS(id),
            FOREIGN KEY (tag_id) REFERENCES TAGS_PINTERPETS(id)
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