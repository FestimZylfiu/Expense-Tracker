<reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NODE_ENV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.css' {
  const content: { [key: string]: string };
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*/graphql/queries/*.query' {
  import { DocumentNode } from '@apollo/client';
  export const GET_AUTHENTICATED_USER: DocumentNode;
  export const GET_USER_AND_TRANSACTIONS: DocumentNode;
  export const GET_TRANSACTIONS: DocumentNode;
  export const GET_TRANSACTION: DocumentNode;
  export const GET_TRANSACTION_STATISTICS: DocumentNode;
}

declare module '*/graphql/mutations/*.mutation' {
  import { DocumentNode } from '@apollo/client';
  export const LOGIN: DocumentNode;
  export const LOGOUT: DocumentNode;
  export const SIGN_UP: DocumentNode;
  export const CREATE_TRANSACTION: DocumentNode;
  export const UPDATE_TRANSACTION: DocumentNode;
  export const DELETE_TRANSACTION: DocumentNode;
}
