import { Knex } from 'knex';

/*
 * Extensão da definição de tipos do knex.
 *
 */

declare module 'knex/types/tables' {
  export interface Tables {
    transactions: {
      id: string;
      title: string;
      amount: number;
      created_at: string;
      session_id: string;
    };
  }
}
