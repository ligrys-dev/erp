import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/users.entity';
import { hashPwd } from 'src/utils/handle-pwd';

@Injectable()
export class UsersService {
  constructor() {}

  async register(user: CreateUserDto) {
    const registeredUser = new User();
    registeredUser.username = user.username;
    registeredUser.email = user.email;
    registeredUser.pwdHash = await hashPwd(user.pwd);

    const { pwdHash, ...result } = await registeredUser.save();

    return result;
  }

  async findOneById(id: string) {
    return await User.findOneByOrFail({ id });
  }

  async findOneByUsernameOrEmail(usernameOrEmail: string) {
    return await User.findOne({
      where: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
  }
}
