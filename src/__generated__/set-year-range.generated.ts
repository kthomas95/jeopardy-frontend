import * as Types from '../graphql/graphql-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const SetYearRangeDocument = gql`
    mutation SetYearRange($yearRange: [Int!]!) {
  setYearRange(yearRange: $yearRange)
}
    `;

export function useSetYearRangeMutation() {
  return Urql.useMutation<SetYearRangeMutation, SetYearRangeMutationVariables>(SetYearRangeDocument);
};
export type SetYearRangeMutationVariables = Types.Exact<{
  yearRange: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;


export type SetYearRangeMutation = { setYearRange: boolean };
