import { getCustomRepository } from 'typeorm';
import Customer from '../models/Customer';
import CustomersRepository from '../repositories/CustomersRepository';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateCustomerService {
  public async execute({ name, email, password }: Request): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const checkCustomerExist = await customerRepository.findOne({
      where: { email },
    });

    if (checkCustomerExist) {
      throw new Error('Email address already used');
    }

    const customer = customerRepository.create({
      name,
      email,
      password,
    });

    await customerRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
