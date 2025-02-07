import * as Types from '../graphql/graphql-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const GetGameDocument = gql`
    subscription GetGame($playerName: String!) {
  getGame(playerName: $playerName) {
    __typename
    ... on PendingGame {
      players
    }
    ... on PlayingGame {
      stateString
    }
  }
}
    `;

export function useGetGameSubscription<TData = GetGameSubscription>(options: Omit<Urql.UseSubscriptionArgs<GetGameSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandler<GetGameSubscription, TData>) {
  return Urql.useSubscription<GetGameSubscription, TData, GetGameSubscriptionVariables>({ query: GetGameDocument, ...options }, handler);
};
export type GetGameSubscriptionVariables = Types.Exact<{
  playerName: Types.Scalars['String']['input'];
}>;


export type GetGameSubscription = { getGame: { __typename: 'PendingGame', players: Array<string> } | { __typename: 'PlayingGame', stateString: string } };
