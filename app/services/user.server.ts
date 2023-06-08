import { User } from '~/models/user';

export interface UserDto {
  id: string;
  email: string;
  name: string;
}

export class UserService {
  async findOrCreate(email: string, name: string): Promise<UserDto> {
    console.log('findOrCreate', email, name)
    const existingUser = await User.findBy('email', email.toLowerCase())

    if (existingUser) {
      console.log('existingUser', existingUser)
      return this.transformUser(existingUser)
    }

    const user = await User.create({
      email: email.toLowerCase(),
      name,
    })

    console.log('newUser', user)

    return this.transformUser(user)
  }

  private transformUser(user: User): UserDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    }
  }
}
