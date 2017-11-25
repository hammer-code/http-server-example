const init = require('src/model');
const data = require('src/data');

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
    try {
      model.findStudent(100)
    } catch (err) {
      expect(err.message).toBe('Student with ID of 100 was not found.');
    }
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
    const ID = 1000;

    try {
      model.updateStudent(ID, { name: 'John Doe' });
    } catch (err) {
      expect(err.message).toBe('Student with ID of 1000 was not found.');
    }
  });
});

describe('replaceStudent', () => {
  test('can replace student', () => {
    const ID = 1;
    const newStudent = { id: 10, name: 'John Doe', email: 'john@google.co' };
    const student = model.replaceStudent(ID, newStudent);

    expect(student).toEqual(newStudent);

    try {
      model.findStudent(1);
    } catch (err) {
      expect(err.message).toBe('Student with ID of 1 was not found.');
    }
  });

  it('should throw error when student is not found', () => {
    const ID = 1000;

    try {
      model.replaceStudent(ID, { name: 'John Doe' });
    } catch (err) {
      expect(err.message).toBe('Student with ID of 1000 was not found.');
    }
  });
});

describe('deleteStudent', () => {
  it('should delete spesific student', () => {
    const ID = 1;
    model.deleteStudent(1);

    let result;
    try {
      result = model.findStudent(1);
    } catch (err) {
      expect(err.message).toBe('Student with ID of 1 was not found.');
    }

    expect(result).toBe(undefined);
  });

  it('should throw error when student is not found', () => {
    const ID = 1000;

    try {
      model.deleteStudent(ID);
    } catch (err) {
      expect(err.message).toBe('Student with ID of 1000 was not found.');
    }
  });
});
