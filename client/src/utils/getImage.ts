import { UPLOAD_URL } from './constants'

export const getImageUrl = (url: string | undefined): string => {
  if (!url) return ''

  if (url.startsWith('http')) {
    return url
  }

  if (url.startsWith('/')) {
    return `${UPLOAD_URL}${url}`
  }

  return url
}
