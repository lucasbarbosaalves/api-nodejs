import { beforeAll, afterAll, describe, expect, it, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';
import { execSync } from 'child_process';

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    execSync('npm run knex migrate:latest');
  });

  it('user can create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'new transaction',
        amount: 5000,
        type: 'credit',
      })
      .expect(201);
  });

  it('should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'new transaction',
        amount: 5000,
        type: 'credit',
      });

    const cookies = createTransactionResponse.get('Set-Cookie') ?? [];

    const listTransactionResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200);

    expect(listTransactionResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'new transaction',
        amount: 5000,
      }),
    ]);
  });

  it('should be able to get a specific transaction', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'new transaction',
        amount: 5000,
        type: 'credit',
      });

    const cookies = createTransactionResponse.get('Set-Cookie') ?? [];

    const listTransactionResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200);

    const id = listTransactionResponse.body.transactions[0].id;

    const getTransactionResponse = await request(app.server)
      .get(`/transactions/${id}`)
      .set('Cookie', cookies)
      .expect(200);

    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: 'new transaction',
        amount: 5000,
      })
    );
  });

  it('should be able to get the summary', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'credit transaction',
        amount: 5000,
        type: 'credit',
      });

    const cookies = createTransactionResponse.get('Set-Cookie') ?? [];

    await request(app.server)
      .post('/transactions')
      .set('Cookie', cookies)
      .send({
        title: 'credit transaction',
        amount: 2000,
        type: 'debit',
      });

    const summaryResponse = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies)
      .expect(200);

    expect(summaryResponse.body.summary).toEqual({
      amount: 3000,
    });
  });
});
