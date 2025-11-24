import { Controller, Get, Param } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import * as crypto from 'crypto';

@Controller('records')
export class RecordsController {
  constructor(private prisma: PrismaService) {}

  @Get(':patientId')
  async getRecord(@Param('patientId') patientId: string) {
    const record = await this.prisma.medicalRecord.findUnique({ where: { patientId } });
    if (!record) return null;
    const key = Buffer.from((process.env.ENCRYPTION_KEY || '').replace('base64:', ''), 'base64');
    const iv = Buffer.from(record.iv, 'base64');
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(Buffer.from(record.tag, 'base64'));
    const decrypted = Buffer.concat([decipher.update(record.encryptedPayload, 'base64'), decipher.final()]).toString();
    return { ...record, payload: JSON.parse(decrypted) };
  }
}
