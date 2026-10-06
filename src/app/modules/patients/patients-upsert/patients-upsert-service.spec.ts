import { FormBuilder } from '@angular/forms';
import { PatientsUpsertService } from './patients-upsert-service';

describe('PatientsUpsertService', () => {
  const service = new PatientsUpsertService(new FormBuilder());
  it('requires identity, contact and address fields', () => {
    const form = service.getPatientFormBuilder();
    for (const field of ['fullName', 'birthDate', 'identification', 'mainPhone', 'mainCellphone', 'email', 'postalCode', 'state', 'city', 'neighborhood', 'street', 'number', 'complement']) {
      expect(form.get(field)?.hasError('required')).withContext(field).toBeTrue();
    }
    expect(form.get('gender')?.value).toBe('Other');
    expect(form.get('registration')?.valid).toBeTrue();
    expect(form.get('socialName')?.valid).toBeTrue();
  });
  it('validates email and creates independent forms', () => {
    const form = service.getPatientFormBuilder();
    form.get('email')?.setValue('invalid');
    expect(form.get('email')?.hasError('email')).toBeTrue();
    form.get('email')?.setValue('ana@example.com');
    expect(form.get('email')?.valid).toBeTrue();
    expect(service.getPatientFormBuilder().get('email')?.value).toBe('');
  });
});
