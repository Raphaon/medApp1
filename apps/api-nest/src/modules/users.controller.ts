import { Controller, Get, Req } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller('users')
export class UsersController {
  constructor(private prisma: PrismaService) {}

  @Get('me')
  async me(@Req() req: any) {
    const userId = req.user?.sub || req.headers['x-user'] || '';
    return this.prisma.user.findUnique({ where: { id: userId } });
  }
}
