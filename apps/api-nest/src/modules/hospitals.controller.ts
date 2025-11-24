import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller('hospitals')
export class HospitalsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  list(@Query('country') country?: string) {
    return this.prisma.hospital.findMany({ where: country ? { country } : {} });
  }

  @Post()
  create(@Body() body: any) {
    return this.prisma.hospital.create({ data: body });
  }
}
