import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller('appointments')
export class AppointmentsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  list(@Query() query: any) {
    return this.prisma.appointment.findMany({ where: { status: query.status } });
  }

  @Post()
  async create(@Body() body: any) {
    const overlap = await this.prisma.appointment.findFirst({
      where: {
        staffId: body.staffId,
        AND: [
          { dateTimeStart: { lt: body.dateTimeEnd } },
          { dateTimeEnd: { gt: body.dateTimeStart } },
        ],
      },
    });
    if (overlap) throw new Error('Slot unavailable');
    return this.prisma.appointment.create({ data: body });
  }

  @Post(':id/confirm')
  confirm(@Param('id') id: string) {
    return this.prisma.appointment.update({ where: { id }, data: { status: 'confirmed' } });
  }
}
