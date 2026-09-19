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
    images: ['https://images.pexels.com/photos/19651857/pexels-photo-19651857.jpeg'],
    name: 'Zahra Kaabi',
    email: 'kaabizahra@gmail.com',
    phoneNumber: '+216 22 222 222',
    role: 'CEO',
    company: 'Wuckert Inc',
    status: 'Active'
  },
  {
    id: '02',
    images: ['https://images.pexels.com/photos/6974969/pexels-photo-6974969.jpeg'],
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    phoneNumber: '+1 123 456 7890',
    role: 'CTO',
    company: 'Doe Technologies',
    status: 'Banned'
  },
  {
    id: '03',
    images: ['https://images.pexels.com/photos/6625954/pexels-photo-6625954.jpeg'],
    name: 'Jane Smith',
    email: 'janesmith@gmail.com',
    phoneNumber: '+44 20 1234 5678',
    role: 'Software Engineer',
    company: 'Smith Solutions',
    status: 'Pending'
  }
];