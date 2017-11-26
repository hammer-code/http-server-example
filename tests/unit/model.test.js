import init from 'src/model';
import data from 'src/data';
import { ModelNotFound } from 'src/error';

let model;

beforeEach(function () {
  model = init(data);
})

describe('findAllStudent', () => {
  test('return correct data', () => {
    expect(model.findAllStudent()).toEqual(data.students);
  });
});

describe('findStudent', () => {
  test('return correct data', () => {
    expect(model.findStudent(1)).toEqual(data.students[0]);
  });

  test('throw error when not found', () => {
    const tryToFindStudent = () => {
      model.findStudent(100)
    };

    expect(tryToFindStudent).toThrow(ModelNotFound);
    expect(tryToFindStudent).toThrow('Student with ID of 100 was not found.');
  });
});

describe('addStudent', () => {
  test('return correct data', () => {
    const newStudent = { name: 'Mark', email: 'mark@gmail.com' };
    const createdStudent = model.addStudent(newStudent);

    expect(createdStudent).toEqual({
      id: 4,
      name: 'Mark',
      email: 'mark@gmail.com',
    });
  });
});

describe('updateStudent', () => {
  test('can update a field', () => {
    const ID = 1;
    const oldStudent = model.findStudent(ID);
    const student = model.updateStudent(ID, { name: 'John Doe' });

    expect(student.id).toBe(1);
    expect(student.name).toEqual('John Doe');
    expect(student.email).toEqual(oldStudent.email);
  });

  test('can update two field', () => {
    const ID = 1;
    const student = model.updateStudent(ID, { name: 'John Doe', email: 'john@doe.com' });

    expect(student.id).toBe(1);
    expect(student.name).toEqual('John Doe');
    expect(student.email).toEqual('john@doe.com');
  });

  it('should throw error when student is not found', () => {
    const tryToUpdateStudent = () => {
      model.updateStudent(1000, { name: 'John Doe' });
    };

    expect(tryToUpdateStudent).toThrow(ModelNotFound);
    expect(tryToUpdateStudent).toThrow('Student with ID of 1000 was not found.');
  });
});

describe('replaceStudent', () => {
  test('can replace student', () => {
    const ID = 1;
    const newStudent = { id: 10, name: 'John Doe', email: 'john@google.co' };
    const student = model.replaceStudent(ID, newStudent);

    expect(student).toEqual(newStudent);

    const tryToFindStudent = () => {
      model.findStudent(1);
    };

    expect(tryToFindStudent).toThrow(ModelNotFound);
    expect(tryToFindStudent).toThrow('Student with ID of 1 was not found.');
  });

  it('should throw error when student is not found', () => {
    const ID = 1000;

    const tryToReplaceStudent = () => {
      model.replaceStudent(ID, { name: 'John Doe' });
    }

    expect(tryToReplaceStudent).toThrow(ModelNotFound);
    expect(tryToReplaceStudent).toThrow('Student with ID of 1000 was not found.');
  });
});

describe('deleteStudent', () => {
  it('should delete spesific student', () => {
    const ID = 1;
    model.deleteStudent(1);

    const tryToFindStudent = () => {
      model.findStudent(1);
    };

    expect(tryToFindStudent).toThrow(ModelNotFound);
    expect(tryToFindStudent).toThrow('Student with ID of 1 was not found.');
  });

  it('should throw error when student is not found', () => {
    const ID = 1000;

    const tryToDeleteStudent = () => {
      model.deleteStudent(ID);
    };

    expect(tryToDeleteStudent).toThrow(ModelNotFound);
    expect(tryToDeleteStudent).toThrow('Student with ID of 1000 was not found.');
  });
});

describe('findStudentClasses', () => {
  it('should return correct data', () => {
    expect(model.findStudentClasses(1)).toEqual([
      { id: 1, name: 'Kalkulus' },
      { id: 2, name: 'Algoritma Pemograman' },
      { id: 3, name: 'Statistika' },
    ]);

    expect(model.findStudentClasses(2)).toEqual([
      { id: 1, name: 'Kalkulus' },
      { id: 3, name: 'Statistika' },
    ]);

    expect(model.findStudentClasses(3)).toEqual([
      { id: 1, name: 'Kalkulus' },
    ]);
  });

  it('should throw error when trying to find non-existing student\'s classes', () => {
    const tryToFindStudentClasses = () => {
      model.findStudentClasses(4);
    };

    expect(tryToFindStudentClasses).toThrow(ModelNotFound);
  });
});
