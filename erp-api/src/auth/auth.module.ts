import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [forwardRef(() => UsersModule), HttpModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
