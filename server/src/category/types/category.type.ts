import { Category } from '../entities/category.entities';

export type Pagination = {
  current_page: number;
  per_page: number;
  total_pages: number;
  total_items: number;
};

export type CategoiesReponse = {
  data: Category[];
  pagination: Pagination;
};
