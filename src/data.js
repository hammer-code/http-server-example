const students = [
  { id: 1, name: 'Adi', email: 'adi@gmail.com' },
  { id: 2, name: 'Budi', email: 'budu@gmail.com' },
  { id: 3, name: 'Cepi', email: 'cepi@gmail.com' },
];

const classes = [
  { id: 1, name: 'Kalkulus' },
  { id: 2, name: 'Algoritma Pemograman' },
  { id: 3, name: 'Statistika' },
];

const pivot = [
  { studentId: 1, classId: 1 },
  { studentId: 1, classId: 2 },
  { studentId: 1, classId: 3 },
  { studentId: 2, classId: 1 },
  { studentId: 2, classId: 3 },
  { studentId: 3, classId: 1 },
];

export default {
  pivot,
  classes,
  students,
};
