import { ImageDatabase } from "../data/ImageDatabase";
import { IdGenerator } from "./services/IdGenerator";
import { Authenticator } from "./services/Authenticator";
import { CustomError } from "./error/CustomError";
import { ImageInputDTO } from "./entities/image";

export class ImageBusiness {

   constructor(
      private idGenerator: IdGenerator,
      private authenticator: Authenticator,
      private imageDatabase: ImageDatabase,
   ) { }

   async createImage(image: ImageInputDTO, token: string) {

      

      if(!image.subtitle ||
        !image.author ||
        !image.date ||
        !image.file ||
        !image.tags ||
        !image.collection){
         throw new CustomError(417, "invalid input to createImage");
      }

      const tokenData = this.authenticator.getData(token)

      if(tokenData === undefined) {
         throw new CustomError(404,"Incorrect token")
      }

      const id = this.idGenerator.generate();

      await this.imageDatabase.createImage(
         id,
         image.subtitle,
         image.author,
         image.date,
         image.file,
         image.tags,
         image.collection
      );
   }

//    async getDetailsById(id: string) {

//       const bandFromDB = await this.imageDatabase.getBandById(id);

//       if(!id){
//          throw new CustomError(404, "Invalid Id");
//       }
      
     
//       if (bandFromDB===undefined) {
//          throw new CustomError(404, "Invalid Id");
//       }
      
//       return bandFromDB;
//    }

}
