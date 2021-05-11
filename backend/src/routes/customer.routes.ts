import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import CustomersRepository from '../repositories/CustomersRepository';
import CreateCustomerService from '../services/CreateCustomerService';

const customerRouter = Router();

// List all Customers
customerRouter.get('/', async (request, response) => {
  const customersRepository = getCustomRepository(CustomersRepository);
  const customers = await customersRepository.find();

  return response.json(customers);
});

// Get Customer with id
customerRouter.get('/:id', async (request, response) => {
  const customersRepository = getCustomRepository(CustomersRepository);
  const { id } = request.params;
  const customers = await customersRepository.findOne(id);

  return response.json(customers);
});

// Create Customer
customerRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createCustomer = new CreateCustomerService();

    const customer = await createCustomer.execute({
      name,
      email,
      password,
    });

    return response.status(201).json(customer);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

// Update Customer
customerRouter.patch('/:id', async (request, response) => {
  const customersRepository = getCustomRepository(CustomersRepository);
  const { id } = request.params;
  const { name, email, password } = request.body;

  await customersRepository.update(id, {
    name,
    email,
    password,
  });

  return response.json({ name, email, password });
});

// Delete Customer
customerRouter.delete('/:id', async (request, response) => {
  try {
    const customersRepository = getCustomRepository(CustomersRepository);
    const { id } = request.params;

    const result = await customersRepository.delete(id);

    return response.status(204).json(result);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default customerRouter;
