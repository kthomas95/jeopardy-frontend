import * as Types from '../graphql/graphql-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const ToggleCategoryDocument = gql`
    mutation ToggleCategory($date: String!, $title: String!) {
  toggleCategory(date: $date, title: $title)
}
    `;

export function useToggleCategoryMutation() {
  return Urql.useMutation<ToggleCategoryMutation, ToggleCategoryMutationVariables>(ToggleCategoryDocument);
};
export type ToggleCategoryMutationVariables = Types.Exact<{
  date: Types.Scalars['String']['input'];
  title: Types.Scalars['String']['input'];
}>;


export type ToggleCategoryMutation = { toggleCategory: boolean };
