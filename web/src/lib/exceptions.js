import ExtendableError from 'es6-error'

export class UnauthorizedError extends ExtendableError {
  constructor(message = 'Unauthorized') {
    super(message)
  }
}
