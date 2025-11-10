"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let UsersService = class UsersService {
    users = [];
    idCounter = 1;
    hash(pw) {
        return (0, crypto_1.createHash)('sha256').update(pw).digest('hex');
    }
    async register(email, password, roles) {
        const user = {
            id: this.idCounter++,
            email,
            passwordHash: this.hash(password),
            roles
        };
        this.users.push(user);
        return user;
    }
    async findByEmail(email) {
        return this.users.find(u => u.email === email);
    }
    async validate(email, password) {
        const user = await this.findByEmail(email);
        if (!user)
            return null;
        return user.passwordHash === this.hash(password) ? user : null;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map