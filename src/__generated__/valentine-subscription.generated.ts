import * as Types from '../graphql/graphql-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const ValentineGameDocument = gql`
    subscription ValentineGame {
  getValentinesDayGame(playerName: "Kaija") {
    stateString
  }
}
    `;

export function useValentineGameSubscription<TData = ValentineGameSubscription>(options?: Omit<Urql.UseSubscriptionArgs<ValentineGameSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandler<ValentineGameSubscription, TData>) {
  return Urql.useSubscription<ValentineGameSubscription, TData, ValentineGameSubscriptionVariables>({ query: ValentineGameDocument, ...options }, handler);
};
export type ValentineGameSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type ValentineGameSubscription = { getValentinesDayGame: { stateString: string } };
