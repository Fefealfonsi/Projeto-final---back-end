export class Image {
    constructor(
       public readonly id: string,
       public readonly subtitle: string,
       public readonly author: string,
       public readonly date: Date,
       public readonly file: string,
       public readonly tags: string[],
       public readonly collection: string
       
    ) { }
    
    
    
 
    public static toImageModel(image: any): Image {
       return new Image(
          image.id,
          image.subtitle,
          image.author,
          image.date,
          image.file,
          image.tags,
          image.collection
       );
 
    }
    
 }
 
 export interface ImageInputDTO {
     subtitle: string,
     author: string,
     date: Date,
     file: string,
     tags: string[],
     collection: string
 }
 
 export interface toImageModel {
     id: string,
     subtitle: string,
     author: string,
     date: Date,
     file: string,
     tags: string[],
     collection: string
   
 }
  
 export interface AuthenticationData {
    id: string;
 }
