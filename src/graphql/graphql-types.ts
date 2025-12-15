export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
}

export interface AskForConfirmation {
  __typename?: 'AskForConfirmation';
  actualAnswer: Scalars['String']['output'];
  canGoNeutral: Scalars['Boolean']['output'];
  providedAnswer?: Maybe<Scalars['String']['output']>;
  question: QuestionWithoutAnswer;
}

export interface AskingForAnswer {
  __typename?: 'AskingForAnswer';
  category: Scalars['String']['output'];
  clue: Scalars['String']['output'];
}

export interface AskingForConfirmation {
  __typename?: 'AskingForConfirmation';
  actualAnswer: Scalars['String']['output'];
  providedAnswer: Scalars['String']['output'];
}

export interface AskingForDailyDoubleWager {
  __typename?: 'AskingForDailyDoubleWager';
  category: Scalars['String']['output'];
  maxWager: Scalars['Int']['output'];
}

export interface AskingForWager {
  __typename?: 'AskingForWager';
  category: Scalars['String']['output'];
  maxWager: Scalars['Int']['output'];
}

export interface CanBuzz {
  __typename?: 'CanBuzz';
  question: QuestionWithoutAnswer;
}

export interface CanProvideManualAnswer {
  __typename?: 'CanProvideManualAnswer';
  question: QuestionWithoutAnswer;
}

export interface CorrectResponse {
  __typename?: 'CorrectResponse';
  amount: Scalars['Int']['output'];
  answer: Scalars['String']['output'];
  hint: Scalars['String']['output'];
  playerName: Scalars['String']['output'];
}

export interface FjWaiting {
  __typename?: 'FJWaiting';
  type: Scalars['String']['output'];
}

export interface FinalJeopardy {
  __typename?: 'FinalJeopardy';
  status: FinalJeopardyStatus;
}

export interface FinalJeopardyQuestion {
  __typename?: 'FinalJeopardyQuestion';
  answer: Scalars['String']['output'];
  category: Scalars['String']['output'];
  episodeDate: Scalars['String']['output'];
  hint: Scalars['String']['output'];
}

export type FinalJeopardyStatus = AskingForAnswer | AskingForConfirmation | AskingForWager | FjWaiting;

export interface FinalJeopardySummary {
  __typename?: 'FinalJeopardySummary';
  amountWagered: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  providedAnswer: Scalars['String']['output'];
  wasCorrect: Scalars['Boolean']['output'];
}

export type GameLogItem = CorrectResponse | IncorrectResponse | ManualModeSummary | Message | StumpAnswer;

export enum GameStyle {
  Manual = 'Manual',
  StandardFastest = 'StandardFastest',
  StandardLowest = 'StandardLowest',
  StandardRandom = 'StandardRandom'
}

export interface HighscoreResult {
  __typename?: 'HighscoreResult';
  amount: Scalars['Int']['output'];
  playerName: Scalars['String']['output'];
  record: WinLossRecord;
}

export interface IncorrectResponse {
  __typename?: 'IncorrectResponse';
  actualAnswerIfDailyDouble?: Maybe<Scalars['String']['output']>;
  amount: Scalars['Int']['output'];
  hint: Scalars['String']['output'];
  playerName: Scalars['String']['output'];
}

export interface Item {
  __typename?: 'Item';
  answer?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  verification?: Maybe<Scalars['Boolean']['output']>;
}

export interface ManualModeSummary {
  __typename?: 'ManualModeSummary';
  amount: Scalars['Int']['output'];
  answer: Scalars['String']['output'];
  hint: Scalars['String']['output'];
  playerSummary: Array<Item>;
}

export interface Message {
  __typename?: 'Message';
  message: Scalars['String']['output'];
}

export interface Mutation {
  __typename?: 'Mutation';
  createGame: Scalars['Boolean']['output'];
  finalizePlayers: Scalars['Boolean']['output'];
  joinGame: Scalars['Boolean']['output'];
  makeMove: Scalars['Boolean']['output'];
  resetGame: Scalars['Boolean']['output'];
  setGameStyle: Scalars['Boolean']['output'];
  setYearRange: Scalars['Boolean']['output'];
  toggleCategory: Scalars['Boolean']['output'];
}


export interface MutationJoinGameArgs {
  playerName: Scalars['String']['input'];
}


export interface MutationMakeMoveArgs {
  gameMoveString: Scalars['String']['input'];
  playerName: Scalars['String']['input'];
}


export interface MutationSetGameStyleArgs {
  gameStyle: GameStyle;
}


export interface MutationSetYearRangeArgs {
  yearRange: Array<Scalars['Int']['input']>;
}


export interface MutationToggleCategoryArgs {
  date: Scalars['String']['input'];
  title: Scalars['String']['input'];
}

export interface OpponentHasDailyDouble {
  __typename?: 'OpponentHasDailyDouble';
  category: Scalars['String']['output'];
  clue?: Maybe<Scalars['String']['output']>;
  playerWithDailyDouble: Scalars['String']['output'];
  wager?: Maybe<Scalars['Int']['output']>;
}

export interface OpponentIsBuzzing {
  __typename?: 'OpponentIsBuzzing';
  opponentIsLookingAtAnswer: Scalars['Boolean']['output'];
  playerBuzzing: Scalars['String']['output'];
  question: QuestionWithoutAnswer;
}

export interface Over {
  __typename?: 'Over';
  fj: FinalJeopardyQuestion;
  fjSummaries: Array<FinalJeopardySummary>;
  winner: Scalars['String']['output'];
}

export interface PendingCategoryPlayer {
  __typename?: 'PendingCategoryPlayer';
  date: Scalars['String']['output'];
  isSelected: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
}

export interface PendingFinalJeopardyPlayerStatus {
  __typename?: 'PendingFinalJeopardyPlayerStatus';
  waitingOnYou: Scalars['Boolean']['output'];
}

export interface PendingGamePlayerView {
  __typename?: 'PendingGamePlayerView';
  gameStyle: GameStyle;
  pendingCategories?: Maybe<Array<PendingCategoryPlayer>>;
  players: Array<Profile>;
  yearRange: Array<Scalars['Int']['output']>;
}

export interface Player {
  __typename?: 'Player';
  money: Scalars['Int']['output'];
  name: Scalars['String']['output'];
}

export interface PlayerRoundView {
  __typename?: 'PlayerRoundView';
  availableClues: Array<Array<Maybe<PlayerViewClue>>>;
  categories: Array<PlayerViewCategory>;
  status: PlayerViewRoundState;
}

export interface PlayerView {
  __typename?: 'PlayerView';
  log: Array<GameLogItem>;
  players: Array<PlayerViewPlayer>;
  status?: Maybe<PlayerViewGameStatus>;
}

export interface PlayerViewCategory {
  __typename?: 'PlayerViewCategory';
  date: Scalars['String']['output'];
  title: Scalars['String']['output'];
}

export interface PlayerViewClue {
  __typename?: 'PlayerViewClue';
  aboutToBeShown: Scalars['Boolean']['output'];
  category: Scalars['String']['output'];
  hint?: Maybe<Scalars['String']['output']>;
  moneyAmount: Scalars['Int']['output'];
}

export type PlayerViewGameStatus = FinalJeopardy | Over | Round;

export interface PlayerViewPlayer {
  __typename?: 'PlayerViewPlayer';
  fjStatus?: Maybe<PendingFinalJeopardyPlayerStatus>;
  greenRing: Scalars['Boolean']['output'];
  hasNoIdea: Scalars['Boolean']['output'];
  isBuzzing: Scalars['Boolean']['output'];
  moneyAmount: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  redRing: Scalars['Boolean']['output'];
  wasWrong: Scalars['Boolean']['output'];
}

export type PlayerViewRoundState = AskForConfirmation | AskingForDailyDoubleWager | CanBuzz | CanProvideManualAnswer | OpponentHasDailyDouble | OpponentIsBuzzing | SayingAnswer | SelectingClue | Waiting;

/** Profile */
export interface Profile {
  __typename?: 'Profile';
  playerName: Scalars['String']['output'];
}

export interface Query {
  __typename?: 'Query';
  hello: Scalars['String']['output'];
}

export interface QuestionWithoutAnswer {
  __typename?: 'QuestionWithoutAnswer';
  category: Scalars['String']['output'];
  categoryDate: Scalars['String']['output'];
  hint: Scalars['String']['output'];
  moneyAmount: Scalars['Int']['output'];
}

export interface RecentGame {
  __typename?: 'RecentGame';
  epochTime: Scalars['Int']['output'];
  players: Array<Player>;
}

export interface Round {
  __typename?: 'Round';
  status: PlayerRoundView;
}

export interface SayingAnswer {
  __typename?: 'SayingAnswer';
  question: QuestionWithoutAnswer;
}

export interface SelectingClue {
  __typename?: 'SelectingClue';
  type: Scalars['String']['output'];
}

export interface StumpAnswer {
  __typename?: 'StumpAnswer';
  answer: Scalars['String']['output'];
  hint: Scalars['String']['output'];
}

export interface Subscription {
  __typename?: 'Subscription';
  getHighscores: Array<HighscoreResult>;
  getPendingGame?: Maybe<PendingGamePlayerView>;
  getPlayingGame?: Maybe<PlayerView>;
  getRecentGames: Array<RecentGame>;
}


export interface SubscriptionGetPlayingGameArgs {
  playerName: Scalars['String']['input'];
}

export interface Waiting {
  __typename?: 'Waiting';
  message: Scalars['String']['output'];
}

export interface WinLossRecord {
  __typename?: 'WinLossRecord';
  lost: Scalars['Int']['output'];
  tied: Scalars['Int']['output'];
  won: Scalars['Int']['output'];
}
