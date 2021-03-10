import { BaseDatabase } from "./BaseDatabase";
import { CustomError } from "../business/error/CustomError";
import { Image, Tag } from "../business/entities/Image";

export class ImageDatabase extends BaseDatabase {

   private static TABLE_NAME = "IMAGE_PINTERPETS";

   // private static toImaeModel(image: any): Image {
   //    return image && new Image(
   //      image.id,
   //      image.subtitle,
   //      image.author,
   //      image.date,
   //      image.file,
   //      image.tags,
   //      image.collection
   //    );
   // }

   public async createImage(
      id: string,
      subtitle: string,
      author: string,
      date: string,
      file: string,
      tags: string[],
      collection: string
   ): Promise<void> {
      try {

         await BaseDatabase.connection.raw(`INSERT INTO ${ImageDatabase.TABLE_NAME}(id, subtitle, author, date, file, collection)
         VALUES( 
         "${id}",
         "${subtitle}",
         "${author}",
         "${date}",
         "${file}",
         "${collection}")
         `)



         for (let i = 0; i < tags.length; i++) {
            const tagSelect = await BaseDatabase.connection.raw(`
               SELECT tag FROM TAGS_PINTERPETS
               WHERE tag = "${tags[i]}";
               `)

            if (tagSelect[0].length === 0) {


               await BaseDatabase.connection.raw(`
                     INSERT INTO TAGS_PINTERPETS (tag)
                     VALUES( "${tags[i]}")
                     `)


            } else {
               console.log(`A TAG ${tags[i]} já existe`)
            }

         }

         for (let i = 0; i < tags.length; i++) {
            const tagId = await BaseDatabase.connection.raw(`
            SELECT id FROM TAGS_PINTERPETS
            WHERE tag = "${tags[i]}";
            `)


            await BaseDatabase.connection.raw(`
            INSERT INTO IMAGE_TAGS_PINTERPETS (image_id, tag_id)
            VALUES("${id}", "${tagId[0][0].id}")
            `)



         }

      } catch (error) {
         console.log(error)
         throw new CustomError(500, "An unexpected error ocurred kkkkkk ");
      }
   }

   public async getAllImages(id:string): Promise<any> {
      try {

         console.log(id)


         const resultImage = await BaseDatabase.connection.raw(`
         SELECT ip.*, up.name FROM ${ImageDatabase.TABLE_NAME} as ip
         JOIN USER_PINTERPETS as up
         ON up.id = ip.author 
         WHERE author = '${id}'
         `)

                     
         const images: any = []

         for (let image of resultImage[0]) {
           
           
            const imageTags = await BaseDatabase.connection.raw(`
            SELECT tp.tag 
            FROM IMAGE_PINTERPETS AS ip
            JOIN TAGS_PINTERPETS AS tp
            JOIN IMAGE_TAGS_PINTERPETS AS itp
            ON itp.tag_id = tp.id
            ON itp.image_id = ip.id
            WHERE ip.id = '${image.id}';
             
            `)

            
            
           
            const tags: Tag[] = []

            for (let tag of imageTags[0]) {

              

               tags.push(tag.tag)
             
            }

            

            images.push({
               id: image.id,
               name: image.name,
               subtitle: image.subtitle,
               author: image.author,
               date: image.date,
               file: image.file,
               tags: tags,
               collection: image.collection,

            })
                       
            
         }
         return images

      } catch (error) {
         console.log(error)
         throw new CustomError(500, "An unexpected error ocurred");
      }
   }

   public async getImageById(id: string): Promise<any> {
      try {


         const result = await BaseDatabase.connection.raw(`
         SELECT up.nickname, ip.author, ip.id as imageId, ip.subtitle, ip.date, ip.file,tp.tag, ip.collection
         FROM IMAGE_PINTERPETS AS ip
         INNER JOIN USER_PINTERPETS AS up
         ON ip.author = up.id
         JOIN TAGS_PINTERPETS AS tp
         JOIN IMAGE_TAGS_PINTERPETS AS itp
         ON itp.tag_id = tp.id
         ON itp.image_id = ip.id
         WHERE ip.id = '${id}';
         `)

         console.log(result[0])

         return (result[0]);

      } catch (error) {
         console.log(error)
         throw new CustomError(500, "An unexpected error ocurred");
      }
   }
}