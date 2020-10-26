import { Injectable, OnModuleInit } from '@nestjs/common';
import { CommandBus, QueryBus, EventBus } from '@nestjs/cqrs';

import { generate } from 'generate-password';
import { User, Roles, Gender } from '../entities/user.entity';
import PasswordUtils from 'src/common/utils/password.utils';
import { UserInput } from '../input/user.input';
import { IPaginatorParams } from 'src/core/interfaces/IPaginatorParams';
import { PaginatedUsers } from '../dto/paginated.users.dto';
import { FilesService } from 'src/files/services/files.service';

import { BaseService } from 'src/core/service/base.service';
import { FindUsersQuery } from '../queries/impl/find-users.query';
import { FindOneUserQuery } from '../queries/impl/findone-user.query';
import { UpdateOneUserCommand } from '../commands/impl/updateone-user.command';
import { CreateUserCommand } from '../commands/impl/create-user.command';
import { CountUsersQuery } from '../queries/impl/count-users.query';
import { CreateUserEvent } from '../events/impl/create-user.event';
import { ForgotPasswordUserEvent } from '../events/impl/forgot-password-user.event';
import { FindPaginatedUsersQuery } from '../queries/impl/find-paginated-users.query';

@Injectable()
export class UserService extends BaseService<User> {

  constructor(private readonly cBus: CommandBus,
              private readonly qBus: QueryBus,
              private readonly eBus: EventBus,
              private readonly filesService: FilesService,
  ) {
    super(cBus, qBus, eBus);
  }

  async registerFirstadmin() {
    const totalAdmin = await this.getQueryBus().execute(new CountUsersQuery({ roles: { $in: [Roles.ADMIN] } }));
    if (totalAdmin === 0) {
      const adminUser = new User();
      adminUser.email = 'dariel87@gmail.com';
      adminUser.phone = '+5354546413';
      adminUser.roles = [Roles.ADMIN, Roles.USER];
      adminUser.gender = Gender.MALE;
      adminUser.checked_register = true;
      adminUser.firstname = 'Dariel';
      adminUser.lastname = 'Noa Graveran';
      adminUser.password = PasswordUtils.hashPassword('123456789');
      adminUser.avatarFile = await this.filesService.getNoAvatarFile();
      await this.createCommand(new CreateUserCommand(adminUser));
    }
  }

  async register(user: UserInput) {

    await this.registerFirstadmin();

    const u: User = new User();
    Object.assign(u, user);
    u.password = PasswordUtils.hashPassword(u.password);
    if (!user.avatarFile) {
      u.avatarFile = await this.filesService.getNoAvatarFile();
    }
    const createdUser: User = await this.createCommand(new CreateUserCommand(u));
    this.publish(new CreateUserEvent(createdUser));
    return createdUser;
  }

  async allUsers(paginator: IPaginatorParams): Promise<PaginatedUsers> {
    return await this.findPaginatedQuery(new FindPaginatedUsersQuery({}, paginator));
  }

  async findOne(filter: any, populate?: any, select?: any): Promise<User> {
    return await this.findOneQuery(new FindOneUserQuery(filter));
  }


  async validateUser(email: string, password: string): Promise<User | any> {
    const user: User = await this.getUserByEmail(email);
    if (user && PasswordUtils.compare(password, user.password)) {
      user.password = null;
      return user;
    } else if (user && password === user.password) {
      user.password = null;
      return user;
    }
    return null;
  }

  async restorePassword(email: string): Promise<string | any> {
    const user: User = await this.qBus.execute(new FindOneUserQuery({ email: email }));
    if (!user) {
      return null;
    }
    const generatedPassword = generate({
      length: 8,
      numbers: true,
    });

    let updatedUser: User = await this.updateOneCommand(new UpdateOneUserCommand({ _id: user._id }, { password: PasswordUtils.hashPassword(generatedPassword) }));
    updatedUser.avatarFile = await this.filesService.getFile(String(updatedUser.avatarFile));
    this.publish(new ForgotPasswordUserEvent(updatedUser, generatedPassword));
    delete updatedUser.password;
    return updatedUser;
  }

  async getUserByEmail(email: string): Promise<User> {
    let user: User = await this.findOneQuery(new FindOneUserQuery({ email: email }, 'avatarFile', 'email checked_register password firstname avatarFile lastname avatarUrl roles createdAt'));
    if (!user) {
      return null;
    }
    return user;
  }

  matchPassword(password: string, encriptedPassword: string): boolean {
    return PasswordUtils.compare(password, encriptedPassword);
  }

  async setPassword(user: User, newPassword: string): Promise<User> {
    return await this.updateOneCommand(
      new UpdateOneUserCommand(
        { _id: user._id },
        { password: PasswordUtils.hashPassword(newPassword) },
      ),
    );
  }

}
