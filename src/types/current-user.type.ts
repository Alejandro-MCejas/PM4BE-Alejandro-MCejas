import { UserRole } from "src/Users/enum/role.enum"

export interface CurrentUser {
    id: string
    email: string
    roles: UserRole
}