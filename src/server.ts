import fastify from 'fastify';
import { knex } from './database';
import { randomUUID } from 'crypto';
import { env } from './env';

const app = fastify();

app.get('/', async () => {
  const transaction = await knex('transactions')
    .insert({
      id: randomUUID(),
      title: 'Transaction',
      amount: 1000,
    })
    .returning('*');
  return transaction;
});

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('Server is running');
  });
