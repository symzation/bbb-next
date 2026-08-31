import { ENUM_ROLE } from "@/types/enums"

export const ROLE_GROUPS = {
  ADMIN_ONLY: [
    ENUM_ROLE.ADMIN,
  ],

  CAN_CREATE_POST: [
    ENUM_ROLE.ADMIN,
    ENUM_ROLE.AUTHOR,
  ],

  CAN_EDIT_POST: [
    ENUM_ROLE.ADMIN,
    ENUM_ROLE.AUTHOR,
    ENUM_ROLE.EDITOR,
  ],
  
  LOGGED_IN: [
    ENUM_ROLE.ADMIN,
    ENUM_ROLE.AUTHOR,
    ENUM_ROLE.AUTHOR_WAITING_APPROVAL,
    ENUM_ROLE.EDITOR,
    ENUM_ROLE.USER,
  ],
} satisfies Record<string, ENUM_ROLE[]>;

/* export function hasRole(
  userRole: ENUM_ROLE | undefined | null,
  allowedRoles: ENUM_ROLE[],
): boolean {
  if (!userRole) return false
  return allowedRoles.includes(userRole)
} */

export function hasRole(
  role: ENUM_ROLE | null | undefined,
  allowedRoles: readonly ENUM_ROLE[],
) {
  return !!role && allowedRoles.includes(role)
}