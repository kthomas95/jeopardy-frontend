import * as Types from '../graphql/graphql-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const GetHighscoresDocument = gql`
    subscription GetHighscores {
  getHighscores {
    playerName
    amount
  }
}
    `;

export function useGetHighscoresSubscription<TData = GetHighscoresSubscription>(options?: Omit<Urql.UseSubscriptionArgs<GetHighscoresSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandler<GetHighscoresSubscription, TData>) {
  return Urql.useSubscription<GetHighscoresSubscription, TData, GetHighscoresSubscriptionVariables>({ query: GetHighscoresDocument, ...options }, handler);
};
export type GetHighscoresSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type GetHighscoresSubscription = { getHighscores: Array<{ playerName: string, amount: number }> };
