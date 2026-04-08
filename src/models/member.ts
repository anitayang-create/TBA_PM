export type MemberRole = 'GENERAL' | 'ARTIST';

export interface Member {
  id: string; // e.g. M001234
  email: string;
  name: string;
  role: MemberRole;
  registeredAt: string; // YYYY/MM/DD HH:mm
}

export const initialMembers: Member[] = [
  {
    id: 'M001234',
    email: 'john.doe@example.com',
    name: 'John Doe',
    role: 'GENERAL',
    registeredAt: '2023/10/01 14:30',
  },
  {
    id: 'M001235',
    email: 'alice.neon@artmail.com',
    name: 'Alice Neon',
    role: 'ARTIST',
    registeredAt: '2023/10/05 09:15',
  },
  {
    id: 'M001236',
    email: 'bob99@test.com',
    name: 'Bob Smith',
    role: 'GENERAL',
    registeredAt: '2023/11/12 18:45',
  },
  {
    id: 'M001237',
    email: 'creator.lee@studio.com',
    name: 'Lee Studio',
    role: 'ARTIST',
    registeredAt: '2023/12/03 10:20',
  },
  {
    id: 'M001238',
    email: 'demo.user1@foo.com',
    name: 'Demo User 1',
    role: 'GENERAL',
    registeredAt: '2024/01/15 16:00',
  },
];
