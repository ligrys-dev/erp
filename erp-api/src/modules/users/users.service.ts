import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { User } from './entities/users.entity';
import { hashPwd } from 'src/utils/handle-pwd';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersService {
  constructor() {}

  async register(user: RegisterDto) {
    const registeredUser = new User();
    registeredUser.username = user.username;
    registeredUser.email = user.email;
    registeredUser.pwdHash = await hashPwd(user.pwd);

    const { pwdHash, ...result } = await registeredUser.save();

    return result;
  }

  async findOne(id: string) {
    return await User.findOne({ where: { id } });
  }
}
