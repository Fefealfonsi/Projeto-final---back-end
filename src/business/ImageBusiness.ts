import { ImageDatabase } from "../data/ImageDatabase";
import { IdGenerator } from "./services/IdGenerator";
import { Authenticator } from "./services/Authenticator";
import { CustomError } from "./error/CustomError";
import { ImageInputDTO } from "./entities/Image";


export class ImageBusiness {

   constructor(
      private idGenerator: IdGenerator,
      private authenticator: Authenticator,
      private imageDatabase: ImageDatabase,
   ) { }

   async createImage(image: ImageInputDTO, token: string) {

      

      if(!image.subtitle ||
        !image.date ||
        !image.file ||
        !image.tags ||
        !image.collection){
         throw new CustomError(417, "invalid input to createImage");
      }

      // this.authenticator.getData(token)

      const author = this.authenticator.getData(token)

      const id = this.idGenerator.generate();

    

      await this.imageDatabase.createImage(
         id,
         image.subtitle,
         author.id,
         image.date,
         image.file,
         image.tags,
         image.collection
      );
   }

   async getAllImages( token:string): Promise<any> {
      try{

         const id = this.authenticator.getData(token)

         const verifiedToken= this.authenticator.getData(token)

         const imageFromDB = await this.imageDatabase.getAllImages(verifiedToken.id);

       if (!token) {
            throw new Error("jwt expired");
        }

        
     
      if (imageFromDB.length===0 ) {
         throw new CustomError(404, "not found");
      }

      if (imageFromDB[0].author !== id.id) {
         throw new CustomError(404, "not found user");
      }

      
      return imageFromDB;
      }catch(error){
         throw new CustomError (error.statusCode || 400, error.message );
      }

     
   }

   async getImageById(id: string, token:string) {

      try {

      this.authenticator.getData(token)

      const imageFromDB = await this.imageDatabase.getImageById(id) as any;

     
      let imageResult = [];
      
     
      for(let i = 0; i< imageFromDB.length; i++){
        

         let sameName = false;
         for (let j = 0; j < i; j++){
            if(imageResult[j] && imageFromDB[i].id ===  imageResult[j].id){
            imageResult[j].tags.push( imageFromDB[i].tag)
            sameName = true;
            
            break;
            }
         }

         if(!sameName){
            imageResult.push({
               id:imageFromDB[i].id,
               subtitle:imageFromDB[i].subtitle,
               author:imageFromDB[i].author,
               date:imageFromDB[i].date,
               tags:[imageFromDB[i].tag],
               file:imageFromDB[i].file,
               collection:imageFromDB[i].collection,
               nickname:imageFromDB[i].nickname,
            })
         }
      }

      
      const result = imageResult[0]
     
      return {result};
         
      } catch (error) {
         throw new CustomError(error.statusCode, error.message)
         
      }

      
   }

}
