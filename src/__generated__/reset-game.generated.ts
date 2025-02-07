import * as Types from '../graphql/graphql-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const ResetGameDocument = gql`
    mutation ResetGame {
  resetGame
}
    `;

export function useResetGameMutation() {
  return Urql.useMutation<ResetGameMutation, ResetGameMutationVariables>(ResetGameDocument);
};
export type ResetGameMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type ResetGameMutation = { resetGame: boolean };
