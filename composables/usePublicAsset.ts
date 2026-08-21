export const usePublicAsset = () => {
  const baseURL = useRuntimeConfig().app.baseURL
  const normalizedBase = baseURL.endsWith('/') ? baseURL : `${baseURL}/`

  return (path: string) => `${normalizedBase}${path.replace(/^\//, '')}`
}
