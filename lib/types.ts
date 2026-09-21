export type Wish = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
  token?: string;
};

export type PublicWish = Omit<Wish, "token">;
