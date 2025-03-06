import * as Types from '../graphql/graphql-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const GetRecentGamesDocument = gql`
    subscription GetRecentGames {
  getRecentGames {
    players {
      money
      name
    }
    epochTime
  }
}
    `;

export function useGetRecentGamesSubscription<TData = GetRecentGamesSubscription>(options?: Omit<Urql.UseSubscriptionArgs<GetRecentGamesSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandler<GetRecentGamesSubscription, TData>) {
  return Urql.useSubscription<GetRecentGamesSubscription, TData, GetRecentGamesSubscriptionVariables>({ query: GetRecentGamesDocument, ...options }, handler);
};
export type GetRecentGamesSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type GetRecentGamesSubscription = { getRecentGames: Array<{ epochTime: number, players: Array<{ money: number, name: string }> }> };
