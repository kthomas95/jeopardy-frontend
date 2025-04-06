/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from "./routes/__root"
import { Route as ValentineImport } from "./routes/valentine"
import { Route as PresentationImport } from "./routes/presentation"
import { Route as HistoryImport } from "./routes/history"
import { Route as HighscoresImport } from "./routes/highscores"
import { Route as IndexImport } from "./routes/index"
import { Route as GamesIndexImport } from "./routes/games/index"

// Create/Update Routes

const ValentineRoute = ValentineImport.update({
  id: "/valentine",
  path: "/valentine",
  getParentRoute: () => rootRoute,
} as any)

const PresentationRoute = PresentationImport.update({
  id: "/presentation",
  path: "/presentation",
  getParentRoute: () => rootRoute,
} as any)

const HistoryRoute = HistoryImport.update({
  id: "/history",
  path: "/history",
  getParentRoute: () => rootRoute,
} as any)

const HighscoresRoute = HighscoresImport.update({
  id: "/highscores",
  path: "/highscores",
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRoute,
} as any)

const GamesIndexRoute = GamesIndexImport.update({
  id: "/games/",
  path: "/games/",
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/"
      path: "/"
      fullPath: "/"
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    "/highscores": {
      id: "/highscores"
      path: "/highscores"
      fullPath: "/highscores"
      preLoaderRoute: typeof HighscoresImport
      parentRoute: typeof rootRoute
    }
    "/history": {
      id: "/history"
      path: "/history"
      fullPath: "/history"
      preLoaderRoute: typeof HistoryImport
      parentRoute: typeof rootRoute
    }
    "/presentation": {
      id: "/presentation"
      path: "/presentation"
      fullPath: "/presentation"
      preLoaderRoute: typeof PresentationImport
      parentRoute: typeof rootRoute
    }
    "/valentine": {
      id: "/valentine"
      path: "/valentine"
      fullPath: "/valentine"
      preLoaderRoute: typeof ValentineImport
      parentRoute: typeof rootRoute
    }
    "/games/": {
      id: "/games/"
      path: "/games"
      fullPath: "/games"
      preLoaderRoute: typeof GamesIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  "/": typeof IndexRoute
  "/highscores": typeof HighscoresRoute
  "/history": typeof HistoryRoute
  "/presentation": typeof PresentationRoute
  "/valentine": typeof ValentineRoute
  "/games": typeof GamesIndexRoute
}

export interface FileRoutesByTo {
  "/": typeof IndexRoute
  "/highscores": typeof HighscoresRoute
  "/history": typeof HistoryRoute
  "/presentation": typeof PresentationRoute
  "/valentine": typeof ValentineRoute
  "/games": typeof GamesIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  "/": typeof IndexRoute
  "/highscores": typeof HighscoresRoute
  "/history": typeof HistoryRoute
  "/presentation": typeof PresentationRoute
  "/valentine": typeof ValentineRoute
  "/games/": typeof GamesIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | "/"
    | "/highscores"
    | "/history"
    | "/presentation"
    | "/valentine"
    | "/games"
  fileRoutesByTo: FileRoutesByTo
  to:
    | "/"
    | "/highscores"
    | "/history"
    | "/presentation"
    | "/valentine"
    | "/games"
  id:
    | "__root__"
    | "/"
    | "/highscores"
    | "/history"
    | "/presentation"
    | "/valentine"
    | "/games/"
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  HighscoresRoute: typeof HighscoresRoute
  HistoryRoute: typeof HistoryRoute
  PresentationRoute: typeof PresentationRoute
  ValentineRoute: typeof ValentineRoute
  GamesIndexRoute: typeof GamesIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  HighscoresRoute: HighscoresRoute,
  HistoryRoute: HistoryRoute,
  PresentationRoute: PresentationRoute,
  ValentineRoute: ValentineRoute,
  GamesIndexRoute: GamesIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/highscores",
        "/history",
        "/presentation",
        "/valentine",
        "/games/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/highscores": {
      "filePath": "highscores.tsx"
    },
    "/history": {
      "filePath": "history.tsx"
    },
    "/presentation": {
      "filePath": "presentation.tsx"
    },
    "/valentine": {
      "filePath": "valentine.tsx"
    },
    "/games/": {
      "filePath": "games/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
