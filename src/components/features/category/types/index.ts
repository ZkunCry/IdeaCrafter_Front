export type Category = {
  id: number;
  name: string;
  slug: string;
  count: number;
};

export type CategoryResponse = {
  items: Category[];
  total_count: number;
};
