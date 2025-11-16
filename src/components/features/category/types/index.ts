export type Category = {
  id: number;
  name: string;
};

export type CategoryResponse = {
  items: Category[];
  total_count: number;
};
