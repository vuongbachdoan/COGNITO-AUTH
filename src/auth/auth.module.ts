import { AwsCognitoService } from './aws-cognito.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AwsCognitoService],
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })]
})
export class AuthModule {}
