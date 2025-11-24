import { Module } from '@nestjs/common';
import { AppointmentsController } from './appointments.controller';
import { PrismaService } from './prisma.service';

@Module({ controllers: [AppointmentsController], providers: [PrismaService] })
export class AppointmentsModule {}
