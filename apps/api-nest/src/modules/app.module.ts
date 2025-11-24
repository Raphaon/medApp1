import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { UsersModule } from './users.module';
import { HospitalsModule } from './hospitals.module';
import { AppointmentsModule } from './appointments.module';
import { RecordsModule } from './records.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [AuthModule, UsersModule, HospitalsModule, AppointmentsModule, RecordsModule],
  providers: [PrismaService],
})
export class AppModule {}
