import { Module } from '@nestjs/common';
import { RecordsController } from './records.controller';
import { PrismaService } from './prisma.service';

@Module({ controllers: [RecordsController], providers: [PrismaService] })
export class RecordsModule {}
