import { z } from 'zod';

export const profileSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().min(6),
  photoUrl: z.string().url().optional(),
});

export const registrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['Patient', 'Doctor', 'Nurse', 'Admin']),
  tenantId: z.string(),
  profile: profileSchema,
  consentVersion: z.string(),
  consentAcceptedAt: z.string(),
  specialty: z.string().optional(),
  license: z.string().optional(),
});
