import * as Types from '../graphql/graphql-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const SetGameStyleDocument = gql`
    mutation SetGameStyle($gameStyle: GameStyle!) {
  setGameStyle(gameStyle: $gameStyle)
}
    `;

export function useSetGameStyleMutation() {
  return Urql.useMutation<SetGameStyleMutation, SetGameStyleMutationVariables>(SetGameStyleDocument);
};
export type SetGameStyleMutationVariables = Types.Exact<{
  gameStyle: Types.GameStyle;
}>;


export type SetGameStyleMutation = { setGameStyle: boolean };
