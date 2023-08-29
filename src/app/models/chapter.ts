export interface Chapter {
   title: string;
   chapterNumber: number;
   description: string;
   image: string;
   category: {
      id: string,
      description?: string
   },
   content: string;
   isFeatured: boolean;
   views: number;
   createdAt: Date
}
