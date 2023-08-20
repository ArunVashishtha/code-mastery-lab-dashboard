export interface Chapter {
   title: string;
   chapterNumber: number;
   category: {
      id: string,
      description?: string
   },
   content: string;
   isFeatured: boolean;
   views: number;
   createdAt: Date
}
