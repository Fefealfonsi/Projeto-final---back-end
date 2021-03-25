import { Request, Response } from "express";
import { ImageInputDTO } from "../business/entities/Image";
import { Authenticator } from "../business/services/Authenticator";
import { IdGenerator } from "../business/services/IdGenerator";
import { ImageBusiness } from "../business/ImageBusiness";
import { ImageDatabase } from "../data/ImageDatabase";
import dayjs from 'dayjs';

var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const imageBusiness = new ImageBusiness(
   new IdGenerator(),
   new Authenticator(),
   new ImageDatabase()
);

export class ImageController {
   async create(req: Request, res: Response) {
      try {

         let editDate = dayjs(req.body.date, 'DD/MM/YYYY').format('YYYY/MM/DD')

         const input: ImageInputDTO = {
            subtitle: req.body.subtitle,
            date: editDate,
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

   async getAllImages(req: Request, res: Response) {

      try {

         const token = req.headers.authorization as any
         const result = await imageBusiness.getAllImages(token);

         
         
         res.status(200).send({result});

      } catch (error) {
         res
            .status(error.statusCode || 400)
            .send({ error: error.message });
      }
   }

   async getImageById(req: Request, res: Response) {

      try {

         const id = req.params.id as any
         const token = req.headers.authorization as any
         
         const result = await imageBusiness.getImageById(id, token);
         
         res.status(200).send({result});

      } catch (error) {
         res
            .status(error.statusCode || 400)
            .send({ error: error.message });
      }
   }

   async deleteImage(req: Request, res: Response) {

      try {

         const id = req.params.id as any
         const token = req.headers.authorization as any
         
         const result = await imageBusiness.deleteImage(id, token);
         
         res.status(200).send({result});

      } catch (error) {
         res
            .status(error.statusCode || 400)
            .send({ error: error.message });
      }
   }

}
