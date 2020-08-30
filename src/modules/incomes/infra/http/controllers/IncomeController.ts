import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateIncomeService from '../../../services/CreateIncomeService';
import ListIncomesService from '../../../services/ListIncomesService';
import UpdateIncomeService from '../../../services/UpdateIncomeService';
import DeleteIncomeService from '../../../services/DeleteIncomeService';

export default class IncomeController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { type, value, date } = request.body;
    const user_id = request.user.id;

    const createIncome = container.resolve(CreateIncomeService);

    const income = await createIncome.execute({ type, value, user_id, date });
    return response.json(income);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listIncomes = container.resolve(ListIncomesService);

    const incomes = await listIncomes.execute({ user_id });
    return response.json(incomes);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { date, type, value } = request.body;
    const { id } = request.params;
    const user_id = request.user.id;

    const updatedIncome = container.resolve(UpdateIncomeService);

    const incomes = await updatedIncome.execute({
      id,
      date,
      type,
      value,
      user_id,
    });
    return response.json(incomes);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user_id = request.user.id;

    const deleteIncome = container.resolve(DeleteIncomeService);

    await deleteIncome.execute({ id, user_id });

    return response.status(204).json();
  }
}
