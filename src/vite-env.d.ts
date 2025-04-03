/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_CLIENT_ID: string
  // add more environment variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

