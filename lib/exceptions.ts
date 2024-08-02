export class RequiresProPlanError extends Error {
  constructor(message = "This action requires a pro plan") {
    super(message)
  }
}

export class NotLoggedInError extends Error {
  constructor(message = "You must be logged in to perform this action") {
    super(message)
  }
}
