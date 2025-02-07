import * as Types from '../graphql/graphql-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const GetPresentationViewDocument = gql`
    subscription GetPresentationView {
  getPresentationView
}
    `;

export function useGetPresentationViewSubscription<TData = GetPresentationViewSubscription>(options?: Omit<Urql.UseSubscriptionArgs<GetPresentationViewSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandler<GetPresentationViewSubscription, TData>) {
  return Urql.useSubscription<GetPresentationViewSubscription, TData, GetPresentationViewSubscriptionVariables>({ query: GetPresentationViewDocument, ...options }, handler);
};
export type GetPresentationViewSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type GetPresentationViewSubscription = { getPresentationView?: string | null };
