import User from '#models/user'

export class UserDto {
  constructor(private user: User) {}

  toJson() {
    return {
      username: this.user.username,
      email: this.user.email,
    }
  }
}
