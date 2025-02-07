import * as Types from '../graphql/graphql-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const MakeMoveDocument = gql`
    mutation MakeMove($playerName: String!, $gameMoveString: String!) {
  makeMove(playerName: $playerName, gameMoveString: $gameMoveString)
}
    `;

export function useMakeMoveMutation() {
  return Urql.useMutation<MakeMoveMutation, MakeMoveMutationVariables>(MakeMoveDocument);
};
export type MakeMoveMutationVariables = Types.Exact<{
  playerName: Types.Scalars['String']['input'];
  gameMoveString: Types.Scalars['String']['input'];
}>;


export type MakeMoveMutation = { makeMove: boolean };
