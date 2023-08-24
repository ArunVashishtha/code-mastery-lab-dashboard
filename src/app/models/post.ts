export interface Post {
   title: string;
   permalink: string;
   postLabel: string;
   category: {
      categoryId: string,
      category: string,
      categoryDescription?: string
   },
   postImgPath: string;
   excerpt: string;
   content: string;
   isFeatured: boolean;
   isEnablePost: boolean;
   views: number;
   status: string,
   createdAt: Date
}
