import { Request, Response } from "express";
import { ImageInputDTO } from "../business/entities/image";
import { Authenticator } from "../business/services/Authenticator";
import { IdGenerator } from "../business/services/IdGenerator";
import { ImageBusiness } from "../business/ImageBusiness";
import { ImageDatabase } from "../data/ImageDatabase";

const imageBusiness = new ImageBusiness(
   new IdGenerator(),
   new Authenticator(),
   new ImageDatabase()
);

export class ImageController {
   async create(req: Request, res: Response) {
      try {

         const input: ImageInputDTO = {
            subtitle: req.body.subtitle,
            author: req.body.author,
            date: req.body.date,
            file: req.body.file,
            tags: req.body.tags,
            collection: req.body.collection
        }

         const token = req.headers.authorization as any

         await imageBusiness.createImage(input, token);

         res.status(200).send({input});

      } catch (error) {
         res
            .status(error.statusCode || 400)
            .send({ error: error.message });
      }
   }

//    async getDetailsById(req: Request, res: Response) {

//       try {

//          const id = req.params as any
         
//          const result = await imageBusiness.getDetailsById(id);
         
//          res.status(200).send({result});

//       } catch (error) {
//          res
//             .status(error.statusCode || 400)
//             .send({ error: error.message });
//       }
//    }

}
