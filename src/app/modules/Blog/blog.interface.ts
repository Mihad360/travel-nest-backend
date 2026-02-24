export type TBlogStatus = "draft" | "published";

export interface IBlog {
  title: string;
  excerpt?: string;
  content: string;
  thumbnail: string[];
  category?: string;
  tags?: string[];
  status: TBlogStatus;
  isFeatured: boolean;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}