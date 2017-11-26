import ExtendableError from 'es6-error';

export class HttpError extends ExtendableError {}

export class HttpNotFoundError extends HttpError {}

export class HttpBadRequest extends HttpError {}

export class ModelNotFound extends ExtendableError {}

export class InvalidArgumentError extends ExtendableError {}
