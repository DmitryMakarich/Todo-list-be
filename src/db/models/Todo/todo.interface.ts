export interface ITodo {
  id: string;
  user: string;
  email: string;
  text: string;
  status: boolean;
  updated: boolean;
}

export type ICreateTodoAttributes = Pick<ITodo, 'email' | 'text' | 'user'>;
