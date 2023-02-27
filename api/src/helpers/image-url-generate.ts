import path from 'node:path'
import { uploadsUrl } from '@config/config'

export const imageUrlGenerate = (link: string): string => {
  return path.join(uploadsUrl, link)
}
