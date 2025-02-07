import * as Types from '../graphql/graphql-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const GetActiveGameDocument = gql`
    subscription GetActiveGame($playerName: String!) {
  getPlayingGame(playerName: $playerName) {
    stateString
  }
}
    `;

export function useGetActiveGameSubscription<TData = GetActiveGameSubscription>(options: Omit<Urql.UseSubscriptionArgs<GetActiveGameSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandler<GetActiveGameSubscription, TData>) {
  return Urql.useSubscription<GetActiveGameSubscription, TData, GetActiveGameSubscriptionVariables>({ query: GetActiveGameDocument, ...options }, handler);
};
export type GetActiveGameSubscriptionVariables = Types.Exact<{
  playerName: Types.Scalars['String']['input'];
}>;


export type GetActiveGameSubscription = { getPlayingGame?: { stateString: string } | null };
