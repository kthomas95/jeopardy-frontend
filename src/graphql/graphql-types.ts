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

export interface GameNotStarted {
  __typename?: 'GameNotStarted';
  players: Array<Profile>;
}

export interface HighscoreResult {
  __typename?: 'HighscoreResult';
  amount: Scalars['Int']['output'];
  playerName: Scalars['String']['output'];
}

export interface Mutation {
  __typename?: 'Mutation';
  createGame: GameNotStarted;
  joinGame: GameNotStarted;
  makeMove: Scalars['Boolean']['output'];
  resetGame: Scalars['Boolean']['output'];
}


export interface MutationJoinGameArgs {
  playerName: Scalars['String']['input'];
}


export interface MutationMakeMoveArgs {
  gameMoveString: Scalars['String']['input'];
  playerName: Scalars['String']['input'];
}

export interface Player {
  __typename?: 'Player';
  money: Scalars['Int']['output'];
  name: Scalars['String']['output'];
}

export interface PlayingGame {
  __typename?: 'PlayingGame';
  stateString: Scalars['String']['output'];
}

/** Profile */
export interface Profile {
  __typename?: 'Profile';
  playerName: Scalars['String']['output'];
}

export interface Query {
  __typename?: 'Query';
  hello: Scalars['String']['output'];
}

export interface RecentGame {
  __typename?: 'RecentGame';
  date: Scalars['String']['output'];
  players: Array<Player>;
}

export interface Subscription {
  __typename?: 'Subscription';
  getHighscores: Array<HighscoreResult>;
  getPendingGame?: Maybe<GameNotStarted>;
  getPlayingGame?: Maybe<PlayingGame>;
  getPresentationView?: Maybe<Scalars['String']['output']>;
  getRecentGames: Array<RecentGame>;
}


export interface SubscriptionGetPlayingGameArgs {
  playerName: Scalars['String']['input'];
}
