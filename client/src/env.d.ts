interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string
  readonly VITE_APP_API_TOKEN: string
  readonly VITE_APP_UPLOAD_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
