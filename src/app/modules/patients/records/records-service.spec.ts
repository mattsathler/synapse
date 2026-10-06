import { RecordsService } from './records-service';
import { Record } from '../../../../@shared/types/Record';

describe('RecordsService', () => {
  const service = new RecordsService();
  it('groups days and sorts days and times newest first without mutating input', () => {
    const records = [
      { date: '2026-01-01', time: '09:00' },
      { date: '2026-01-02', time: '08:00' },
      { date: '2026-01-01', time: '15:00' },
      { date: '2026-01-01' }
    ] as Record[];
    const original = [...records];
    expect(service.groupRecordsByDay(records)).toEqual([
      { date: '2026-01-02', records: [records[1]] },
      { date: '2026-01-01', records: [records[2], records[0], records[3]] }
    ]);
    expect(records).toEqual(original);
  });
  it('returns no groups for no records', () => expect(service.groupRecordsByDay([])).toEqual([]));
});
