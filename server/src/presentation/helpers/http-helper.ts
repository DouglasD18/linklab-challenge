import { NotFoundError, ServerError } from "../errors"
import { HttpResponse } from "../protocols/http"

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const notFound = (): HttpResponse => {
  return {
    statusCode: 404,
    body: new NotFoundError()
  }
}

export const serverError = (): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError()
  }
}

export const ok = (data: any): HttpResponse => {
  return {
    statusCode: 200,
    body: data
  }
}

export const created = (data: any): HttpResponse => {
  return {
    statusCode: 201,
    body: data
  }
}

export const noContent = (): HttpResponse => {
  return {
    statusCode: 204,
    body: "No Content"
  } 
}
