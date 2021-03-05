export class Image {
    constructor(
       public readonly id: string,
       public readonly subtitle: string,
       public readonly author: string,
       public readonly date: string,
       public readonly file: string,
       public readonly tags: Tag[] | undefined,
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
     date: string,
     file: string,
     tags: string[],
     collection: string
 }
 
 export interface toImageModel {
     id: string,
     subtitle: string,
     author: string,
     date: string,
     file: string,
     tags: Tag[],
     collection: string
 }

 export interface Tag {
   id: string,
   tag: string,
}
 export interface AuthenticationData {
    id: string;
 }
