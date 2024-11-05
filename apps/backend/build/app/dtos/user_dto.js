export class UserDto {
    user;
    constructor(user) {
        this.user = user;
    }
    toJson() {
        return {
            avatarUrl: this.user.avatarUrl,
            nickName: this.user.name,
            email: this.user.email,
        };
    }
}
//# sourceMappingURL=user_dto.js.map