export interface Author {
	name: string;
	slug: string;
}

export type Tag = string;

export interface Submission {
	slug: string;
  image: string;
  headline: string;
  author: Author;
  hook: string;
  tags: Tag[];
  double?: boolean;
}