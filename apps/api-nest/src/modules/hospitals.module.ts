import { Module } from '@nestjs/common';
import { HospitalsController } from './hospitals.controller';
import { PrismaService } from './prisma.service';

@Module({ controllers: [HospitalsController], providers: [PrismaService] })
export class HospitalsModule {}
