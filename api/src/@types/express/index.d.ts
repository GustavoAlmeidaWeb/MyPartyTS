declare namespace Express {
  interface Request {
    user: {
      _id: Types.ObjectId
    }
    file: {
      image: string
      filename: string
    }
  }
}
