import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "src/users/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";


@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        UserModule,
        JwtModule.register({
            secret: process.env.SECRET || 'secret',
            signOptions: { expiresIn: '8h' },
        })
    ]
})
export class AuthModule { }