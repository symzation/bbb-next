export enum ENUM_CHECK_STATE {
  AVAILABLE = "available",
  CHECKING = "checking",
  ERROR = "error",
  IDLE = "",
  INVALID = "invalid",
  TAKEN = "taken",
  UNAVAILABLE = "unavailable",
}

export enum ENUM_ROLE {
  ADMIN = "ADMIN",
  AUTHOR = "AUTHOR",
  AUTHOR_WAITING_APPROVAL = "AUTHOR_WAITING_APPROVAL",
  EDITOR = "EDITOR",
  MEMBER = "MEMBER",
  USER = "USER"
}

export enum ENUM_SUBSCRIPTION {
  BASIC = "BASIC",
  ELITE = "ELITE",
  FREE = "FREE",
  PREMIUM = "PREMIUM",
}

export enum ENUM_USER_STATUS {
  AUTHENTICATED = "authenticated",
  UNAUTHENTICATED = "unauthenticated",
  LOADING = "loading"
}