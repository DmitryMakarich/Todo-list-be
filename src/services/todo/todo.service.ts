import { ORDER, SORT_BY } from '../../helpers/sorting.helper';
import { ICreateTodoAttributes, ITodo, Todo } from '../../db/models/Todo';
import { PaginatedFilter } from '../../helpers/generic.helper';

class TodoService {
  async getTodos({
    page,
    limit,
    sortBy,
    order,
  }: PaginatedFilter<{ sortBy?: SORT_BY; order: ORDER }>): Promise<IGetTodosResult> {
    return Todo.findAndCountAll({
      limit,
      offset: page * limit,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      order: [[sortBy || 'createdAt', order]],
    });
  }

  async addTodo(todoAttributes: ICreateTodoAttributes): Promise<CreateTodoResult> {
    await Todo.create({
      ...todoAttributes,
    });

    return { added: true };
  }

  async updateTodo({
    id,
    text,
    status,
  }: Pick<ITodo, 'id' | 'text' | 'status'>): Promise<UpdateTodoResult> {
    const todo = await Todo.findByPk(id);

    if (!todo) throw new Error(`No todo with id - ${id}`);

    let updated = false;
    if (todo.text !== text || todo.updated) updated = true;

    todo.text = text;
    todo.status = status;
    todo.updated = updated;

    await todo.save();
    return { updated: true };
  }
}

export const todoService = new TodoService();

type CreateTodoResult = { added: true };

type UpdateTodoResult = { updated: true };

interface IGetTodosResult {
  count: number;
  rows: ITodo[];
}
