import { FastifyInstance } from 'fastify';
import { knex } from '../database';
import z from 'zod';
import { randomUUID } from 'crypto';
import { checkSessionIdExists } from '../middleware/check-session-id-exists';

// Essa função é o equivalente a um Plugin do Fastify - que são recursos que estendem funcionalidade do framework
// E podem ser registrados na instância do Fastify
export async function transactionsRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    });

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body
    );

    let sessionId = request.cookies.sessionId;

    if (!sessionId) {
      sessionId = randomUUID();

      reply.cookie('sessionId', sessionId, {
        path: '/', // Define quem pode acessar o cookie
        maxAge: 60 * 60 * 24 * 7, // 7 dias
      });
    }

    await knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type == 'credit' ? amount : amount * -1,
      session_id: sessionId,
    });

    return reply.status(201).send();
  });

  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies;
      const transactions = await knex('transactions')
        .where('session_id', sessionId)
        .select();

      return {
        transactions,
      };
    }
  );

  app.get(
    '/summary',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies;
      const summary = await knex('transactions')
        .where('session_id', sessionId)
        .sum('amount', { as: 'amount' })
        .first();

      return {
        summary,
      };
    }
  );

  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies;
      const getTransactionParamsSchema = z.object({
        id: z.uuid(),
      });

      const { id } = getTransactionParamsSchema.parse(request.params);
      const transaction = await knex('transactions')
        .where({
          session_id: sessionId,
          id: id,
        })
        .first();

      return {
        transaction,
      };
    }
  );
}
