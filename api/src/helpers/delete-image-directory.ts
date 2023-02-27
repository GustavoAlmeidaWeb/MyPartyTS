import fs from 'node:fs'

export const deleteImageDirectory = async (image: string): Promise<void> => {
  const imgStatus = await fs.promises.stat(image)
  if (imgStatus) {
    await fs.promises.unlink(image)
  }
}
