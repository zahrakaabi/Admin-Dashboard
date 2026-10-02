/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Types
import type { USER } from "@/types";

/* -------------------------------------------------------------------------- */
/*                               USER MOCK DATA                               */
/* -------------------------------------------------------------------------- */
export const _users: USER[] = [
  {
    id: '01',
    photoURL: 'https://images.pexels.com/photos/19651857/pexels-photo-19651857.jpeg',
    fullName: 'Zahra Kaabi',
    email: 'kaabizahra@gmail.com',
    phoneNumber: '+216 22 222 222',
    role: 'CEO',
    company: 'Wuckert Inc',
    status: 'Active',
    city: '',
    zip: 0
  },
  {
    id: '02',
    photoURL: 'https://images.pexels.com/photos/6974969/pexels-photo-6974969.jpeg',
    fullName: 'John Doe',
    email: 'johndoe@gmail.com',
    phoneNumber: '+1 123 456 7890',
    role: 'CTO',
    company: 'Doe Technologies',
    status: 'Banned',
    city: '',
    zip: 0
  },
  {
    id: '03',
    photoURL: 'https://images.pexels.com/photos/6625954/pexels-photo-6625954.jpeg',
    fullName: 'Jane Smith',
    email: 'janesmith@gmail.com',
    phoneNumber: '+44 20 1234 5678',
    role: 'Software Engineer',
    company: 'Smith Solutions',
    status: 'Pending',
    city: '',
    zip: 0
  }
];