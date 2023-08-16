export interface Chapter {
   title: string;
   category: {
      id: string,
      description?: string
   },
   content: string;
   isFeatured: boolean;
   views: number;
   createdAt: Date
}
