/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TWITTER_KEY: string
  readonly VITE_TWITTER_SECRET: string
  readonly VITE_TWITTER_BEARER_TOKEN: string
  readonly VITE_TWITTER_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
