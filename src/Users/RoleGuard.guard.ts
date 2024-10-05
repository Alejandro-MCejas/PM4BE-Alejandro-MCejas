import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "./enum/role.enum";




@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const requiredRoles = this.reflector.get<UserRole[]>('roles', context.getHandler())
        console.log(requiredRoles)

        if (!requiredRoles) {
            throw new UnauthorizedException('No se especifico un role')
        }

        const request = context.switchToHttp().getRequest()
        const user = request.user

        if (!user || !requiredRoles.includes(user.roles)) {
            throw new UnauthorizedException('No tienes permiso para realizar esta accion')
        }

       return true
    }
}