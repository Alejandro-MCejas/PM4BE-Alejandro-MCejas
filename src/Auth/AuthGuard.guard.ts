import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";



@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService){}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();

        const token = this.extractTokenFromHeader(request)

        if(!token){
            throw new UnauthorizedException('Token no encontrado')
        }

        
        try {            
            const payload = await this.jwtService.verifyAsync(token)
            console.log(payload)
            request['user'] = payload
        } catch (error) {
            console.log(error)
            throw new UnauthorizedException('Token no valido')
        }
        

        return true
    }

    private extractTokenFromHeader(request: Request){
        const [type, token] = request.headers.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }

}