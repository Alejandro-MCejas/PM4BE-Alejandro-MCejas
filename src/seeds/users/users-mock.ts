import { UserRole } from "src/Users/enum/role.enum";

export const usersMock = [
    {
        name: "Demo User",
        email: process.env.SEED_USER_EMAIL,
        password: process.env.SEED_USER_PASSWORD,
        phone: "000000000",
        country: "Argentina",
        address: "Demo 123",
        city: "Cordoba",
        admin: UserRole.USER
    },
    {
        name: "Demo Admin",
        email: process.env.SEED_ADMIN_EMAIL,
        password: process.env.SEED_ADMIN_PASSWORD,
        phone: "000000000",
        country: "Argentina",
        address: "Demo 123",
        city: "Cordoba",
        admin: UserRole.ADMIN
    }
]