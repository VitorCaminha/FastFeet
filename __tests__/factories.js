import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';
import Recipient from '../src/app/models/Recipient';

factory.define('User', User, {
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('Recipient', Recipient, {
  name: faker.name.findName(),
  street: faker.address.streetName(),
  number: faker.address.streetAddress().split(' ')[0],
  complement: faker.address.secondaryAddress(),
  state: faker.address.state(),
  city: faker.address.city(),
  cep: faker.address.zipCode(),
});

export default factory;
