import * as Types from '../graphql/graphql-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const JoinGameDocument = gql`
    mutation JoinGame($playerName: String!) {
  joinGame(playerName: $playerName) {
    players {
      playerName
    }
  }
}
    `;

export function useJoinGameMutation() {
  return Urql.useMutation<JoinGameMutation, JoinGameMutationVariables>(JoinGameDocument);
};
export type JoinGameMutationVariables = Types.Exact<{
  playerName: Types.Scalars['String']['input'];
}>;


export type JoinGameMutation = { joinGame: { players: Array<{ playerName: string }> } };
