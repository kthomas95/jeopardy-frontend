import * as Types from '../graphql/graphql-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const FinalizePlayersDocument = gql`
    mutation FinalizePlayers {
  finalizePlayers
}
    `;

export function useFinalizePlayersMutation() {
  return Urql.useMutation<FinalizePlayersMutation, FinalizePlayersMutationVariables>(FinalizePlayersDocument);
};
export type FinalizePlayersMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type FinalizePlayersMutation = { finalizePlayers: boolean };
