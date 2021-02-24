import { BaseDatabase } from "./BaseDatabase";
import { CustomError } from "../business/error/CustomError";
import { Image } from "../business/entities/Image";

export class ImageDatabase extends BaseDatabase {

   private static TABLE_NAME = "LAMA_BANDAS";

   private static toImageModel(image: any): Image {
      return image && new Image(
        image.id,
        image.subtitle,
        image.author,
        image.date,
        image.file,
        image.tags,
        image.collection
      );
   }

   public async createImage(
    id: string,
    subtitle: string,
    author: string,
    date: Date,
    file: string,
    tags: string[],
    collection: string
   ): Promise<void> {
      try {
         await BaseDatabase.connection
            .insert({
                id,
                subtitle,
                author,
                date,
                file,
                tags,
                collection,
            })
            .into(ImageDatabase.TABLE_NAME);
      } catch (error) {
         throw new CustomError(500, "An unexpected error ocurred");
      }
   }

//    public async getBandById(id: string): Promise<Band> {
//       try {
//          const result = await BaseDatabase.connection
//             .select("*")
//             .from(BandDatabase.TABLE_NAME)
//             .where(id);
//          return BandDatabase.toBandModel(result[0]);
//          // return (result)
//       } catch (error) {
//          console.log(error)
//          throw new CustomError(500, "An unexpected error ocurred");
//       }
//    }
}