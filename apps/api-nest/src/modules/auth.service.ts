import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto, LoginDto } from './dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async register(dto: RegisterDto) {
    const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash: hash,
        role: dto.role,
        status: ['Doctor', 'Nurse'].includes(dto.role) ? 'pending' : 'active',
        tenantId: dto.tenantId,
        profile: dto.profile,
        consentVersion: dto.consentVersion,
        consentAcceptedAt: dto.consentAcceptedAt,
      },
    });
    return this.signUser(user.id, user.role, user.tenantId);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.signUser(user.id, user.role, user.tenantId);
  }

  signUser(id: string, role: string, tenantId: string) {
    const payload = { sub: id, role, tenantId };
    return {
      accessToken: this.jwt.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: '15m' }),
      refreshToken: this.jwt.sign(payload, { secret: process.env.REFRESH_SECRET, expiresIn: '7d' }),
    };
  }
}
