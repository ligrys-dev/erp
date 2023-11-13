import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('/register')
  async register(@Body() user: RegisterDto) {
    return this.usersService.register(user);
  }
}
