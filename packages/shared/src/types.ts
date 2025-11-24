export type TenantScoped = { tenantId: string };
export type Profile = { firstName: string; lastName: string; phone: string; photoUrl?: string };
export type ConsentInfo = { version: string; acceptedAt: string; scope: string[] };

export type UserDTO = {
  id: string;
  email: string;
  role: 'Patient' | 'Doctor' | 'Nurse' | 'Admin';
  status: 'pending' | 'active' | 'rejected';
  tenantId: string;
  profile: Profile;
} & ConsentInfo;

export type AppointmentDTO = TenantScoped & {
  id: string;
  patientId: string;
  staffId: string;
  serviceId: string;
  dateTimeStart: string;
  dateTimeEnd: string;
  status: 'requested' | 'confirmed' | 'canceled' | 'completed';
};
