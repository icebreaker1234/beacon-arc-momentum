/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional form delivery endpoint for the contact page (see README). */
  readonly VITE_CONTACT_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
