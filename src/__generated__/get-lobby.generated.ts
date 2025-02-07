import * as Types from '../graphql/graphql-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const GetPendingGameDocument = gql`
    subscription GetPendingGame {
  getPendingGame {
    players {
      playerName
    }
  }
}
    `;

export function useGetPendingGameSubscription<TData = GetPendingGameSubscription>(options?: Omit<Urql.UseSubscriptionArgs<GetPendingGameSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandler<GetPendingGameSubscription, TData>) {
  return Urql.useSubscription<GetPendingGameSubscription, TData, GetPendingGameSubscriptionVariables>({ query: GetPendingGameDocument, ...options }, handler);
};
export type GetPendingGameSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type GetPendingGameSubscription = { getPendingGame?: { players: Array<{ playerName: string }> } | null };
