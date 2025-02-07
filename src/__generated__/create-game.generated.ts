import * as Types from '../graphql/graphql-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const CreateGameDocument = gql`
    mutation CreateGame {
  createGame {
    players {
      playerName
    }
  }
}
    `;

export function useCreateGameMutation() {
  return Urql.useMutation<CreateGameMutation, CreateGameMutationVariables>(CreateGameDocument);
};
export type CreateGameMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type CreateGameMutation = { createGame: { players: Array<{ playerName: string }> } };
