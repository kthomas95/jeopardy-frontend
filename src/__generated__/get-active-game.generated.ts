import * as Types from '../graphql/graphql-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export const GameLogFragmentDoc = gql`
    fragment GameLog on GameLogItem {
  __typename
  ... on CorrectResponse {
    answer
    amount
    hint
    playerName
  }
  ... on IncorrectResponse {
    playerName
    hint
    amount
    actualAnswerIfDailyDouble
  }
  ... on Message {
    message
  }
  ... on StumpAnswer {
    hint
    answer
  }
  ... on ManualModeSummary {
    answer
    hint
    amount
    playerSummary {
      answer
      name
      verification
    }
  }
}
    `;
export const PlayerPropsFragmentDoc = gql`
    fragment PlayerProps on PlayerViewPlayer {
  hasNoIdea
  isBuzzing
  moneyAmount
  name
  wasWrong
  fjStatus {
    waitingOnYou
  }
  greenRing
  redRing
}
    `;
export const AvailableCluesPropsFragmentDoc = gql`
    fragment AvailableCluesProps on PlayerViewClue {
  category
  hint
  moneyAmount
  aboutToBeShown
}
    `;
export const QuestionWithoutAnswerPropsFragmentDoc = gql`
    fragment QuestionWithoutAnswerProps on QuestionWithoutAnswer {
  category
  moneyAmount
  hint
  categoryDate
}
    `;
export const RoundViewPropsFragmentDoc = gql`
    fragment RoundViewProps on PlayerRoundView {
  categories {
    date
    title
  }
  availableClues {
    ...AvailableCluesProps
  }
  status {
    __typename
    ... on CanProvideManualAnswer {
      question {
        ...QuestionWithoutAnswerProps
      }
    }
    ... on AskForConfirmation {
      actualAnswer
      canGoNeutral
      providedAnswer
      question {
        ...QuestionWithoutAnswerProps
      }
    }
    ... on AskingForDailyDoubleWager {
      maxWager
      category
    }
    ... on CanBuzz {
      question {
        ...QuestionWithoutAnswerProps
      }
    }
    ... on OpponentHasDailyDouble {
      category
      clue
      playerWithDailyDouble
      wager
    }
    ... on OpponentIsBuzzing {
      question {
        ...QuestionWithoutAnswerProps
      }
      opponentIsLookingAtAnswer
      playerBuzzing
    }
    ... on SayingAnswer {
      question {
        ...QuestionWithoutAnswerProps
      }
    }
    ... on Waiting {
      message
    }
  }
}
    ${AvailableCluesPropsFragmentDoc}
${QuestionWithoutAnswerPropsFragmentDoc}`;
export const FinalJeopardyPropsFragmentDoc = gql`
    fragment FinalJeopardyProps on FinalJeopardyStatus {
  __typename
  ... on AskingForAnswer {
    category
    clue
  }
  ... on AskingForConfirmation {
    actualAnswer
    providedAnswer
  }
  ... on AskingForWager {
    category
    maxWager
  }
  ... on FJWaiting {
    type
  }
}
    `;
export const StatusPropsFragmentDoc = gql`
    fragment StatusProps on PlayerViewGameStatus {
  __typename
  ... on Round {
    status {
      ...RoundViewProps
    }
  }
  ... on FinalJeopardy {
    status {
      ...FinalJeopardyProps
    }
  }
  ... on Over {
    winner
    fjSummaries {
      providedAnswer
      name
      amountWagered
      wasCorrect
    }
    fj {
      hint
      answer
      category
    }
  }
}
    ${RoundViewPropsFragmentDoc}
${FinalJeopardyPropsFragmentDoc}`;
export const PlayerViewPropsFragmentDoc = gql`
    fragment PlayerViewProps on PlayerView {
  log {
    ...GameLog
  }
  players {
    ...PlayerProps
  }
  status {
    ...StatusProps
  }
}
    ${GameLogFragmentDoc}
${PlayerPropsFragmentDoc}
${StatusPropsFragmentDoc}`;
export const GetActiveGameDocument = gql`
    subscription GetActiveGame($playerName: String!) {
  getPlayingGame(playerName: $playerName) {
    ...PlayerViewProps
  }
}
    ${PlayerViewPropsFragmentDoc}`;

export function useGetActiveGameSubscription<TData = GetActiveGameSubscription>(options: Omit<Urql.UseSubscriptionArgs<GetActiveGameSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandler<GetActiveGameSubscription, TData>) {
  return Urql.useSubscription<GetActiveGameSubscription, TData, GetActiveGameSubscriptionVariables>({ query: GetActiveGameDocument, ...options }, handler);
};
export type GameLog_CorrectResponse_Fragment = { __typename: 'CorrectResponse', answer: string, amount: number, hint: string, playerName: string };

export type GameLog_IncorrectResponse_Fragment = { __typename: 'IncorrectResponse', playerName: string, hint: string, amount: number, actualAnswerIfDailyDouble?: string | null };

export type GameLog_ManualModeSummary_Fragment = { __typename: 'ManualModeSummary', answer: string, hint: string, amount: number, playerSummary: Array<{ answer?: string | null, name: string, verification?: boolean | null }> };

export type GameLog_Message_Fragment = { __typename: 'Message', message: string };

export type GameLog_StumpAnswer_Fragment = { __typename: 'StumpAnswer', hint: string, answer: string };

export type GameLogFragment = GameLog_CorrectResponse_Fragment | GameLog_IncorrectResponse_Fragment | GameLog_ManualModeSummary_Fragment | GameLog_Message_Fragment | GameLog_StumpAnswer_Fragment;

export type PlayerPropsFragment = { hasNoIdea: boolean, isBuzzing: boolean, moneyAmount: number, name: string, wasWrong: boolean, greenRing: boolean, redRing: boolean, fjStatus?: { waitingOnYou: boolean } | null };

export type QuestionWithoutAnswerPropsFragment = { category: string, moneyAmount: number, hint: string, categoryDate: string };

export type AvailableCluesPropsFragment = { category: string, hint?: string | null, moneyAmount: number, aboutToBeShown: boolean };

export type RoundViewPropsFragment = { categories: Array<{ date: string, title: string }>, availableClues: Array<Array<AvailableCluesPropsFragment | null>>, status: { __typename: 'AskForConfirmation', actualAnswer: string, canGoNeutral: boolean, providedAnswer?: string | null, question: QuestionWithoutAnswerPropsFragment } | { __typename: 'AskingForDailyDoubleWager', maxWager: number, category: string } | { __typename: 'CanBuzz', question: QuestionWithoutAnswerPropsFragment } | { __typename: 'CanProvideManualAnswer', question: QuestionWithoutAnswerPropsFragment } | { __typename: 'OpponentHasDailyDouble', category: string, clue?: string | null, playerWithDailyDouble: string, wager?: number | null } | { __typename: 'OpponentIsBuzzing', opponentIsLookingAtAnswer: boolean, playerBuzzing: string, question: QuestionWithoutAnswerPropsFragment } | { __typename: 'SayingAnswer', question: QuestionWithoutAnswerPropsFragment } | { __typename: 'SelectingClue' } | { __typename: 'Waiting', message: string } };

export type FinalJeopardyProps_AskingForAnswer_Fragment = { __typename: 'AskingForAnswer', category: string, clue: string };

export type FinalJeopardyProps_AskingForConfirmation_Fragment = { __typename: 'AskingForConfirmation', actualAnswer: string, providedAnswer: string };

export type FinalJeopardyProps_AskingForWager_Fragment = { __typename: 'AskingForWager', category: string, maxWager: number };

export type FinalJeopardyProps_FjWaiting_Fragment = { __typename: 'FJWaiting', type: string };

export type FinalJeopardyPropsFragment = FinalJeopardyProps_AskingForAnswer_Fragment | FinalJeopardyProps_AskingForConfirmation_Fragment | FinalJeopardyProps_AskingForWager_Fragment | FinalJeopardyProps_FjWaiting_Fragment;

export type StatusProps_FinalJeopardy_Fragment = { __typename: 'FinalJeopardy', status: FinalJeopardyProps_AskingForAnswer_Fragment | FinalJeopardyProps_AskingForConfirmation_Fragment | FinalJeopardyProps_AskingForWager_Fragment | FinalJeopardyProps_FjWaiting_Fragment };

export type StatusProps_Over_Fragment = { __typename: 'Over', winner: string, fjSummaries: Array<{ providedAnswer: string, name: string, amountWagered: number, wasCorrect: boolean }>, fj: { hint: string, answer: string, category: string } };

export type StatusProps_Round_Fragment = { __typename: 'Round', status: RoundViewPropsFragment };

export type StatusPropsFragment = StatusProps_FinalJeopardy_Fragment | StatusProps_Over_Fragment | StatusProps_Round_Fragment;

export type PlayerViewPropsFragment = { log: Array<GameLog_CorrectResponse_Fragment | GameLog_IncorrectResponse_Fragment | GameLog_ManualModeSummary_Fragment | GameLog_Message_Fragment | GameLog_StumpAnswer_Fragment>, players: Array<PlayerPropsFragment>, status?: StatusProps_FinalJeopardy_Fragment | StatusProps_Over_Fragment | StatusProps_Round_Fragment | null };

export type GetActiveGameSubscriptionVariables = Types.Exact<{
  playerName: Types.Scalars['String']['input'];
}>;


export type GetActiveGameSubscription = { getPlayingGame?: PlayerViewPropsFragment | null };
