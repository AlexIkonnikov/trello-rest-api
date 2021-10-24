export interface ICard {
  title: string;
  description?: string;
  userId: number;
  columnId: number;
}

export interface IUpdateCard {
  title: string;
  description: string;
}
