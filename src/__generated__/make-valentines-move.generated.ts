import * as Types from '../graphql/graphql-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const ValentinesMoveDocument = gql`
    mutation ValentinesMove($moveString: String!) {
  makeValentinesMove(moveString: $moveString)
}
    `;

export function useValentinesMoveMutation() {
  return Urql.useMutation<ValentinesMoveMutation, ValentinesMoveMutationVariables>(ValentinesMoveDocument);
};
export type ValentinesMoveMutationVariables = Types.Exact<{
  moveString: Types.Scalars['String']['input'];
}>;


export type ValentinesMoveMutation = { makeValentinesMove: boolean };
