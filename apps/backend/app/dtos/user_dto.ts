import User from '#models/user'

export class UserDto {
  constructor(private user: User) {}

  toJson() {
    return {
      avatarUrl: this.user.avatarUrl,
      nickName: this.user.name,
      email: this.user.email,
    }
  }
}
