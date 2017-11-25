function init(data) {
  let { students, classes, pivot } = Object.assign({}, data);

  function findAllStudent() {
    return students;
  }

  function findStundentClasses(id) {
    return pivot.filter((p) => p.studentId === id)
      .map((p) => classes.find(c => c.id === p.classId));
  }

  function updateStudent(id, data) {
    const newId = parseInt(data.id) || id;

    findStudent(id);

    students = students.map((s) => {
      if (id === s.id) {
        return { ...s, ...data, id: newId };
      }

      return s;
    });

    return findStudent(newId);
  }

  function replaceStudent(id, data) {
    const newId = parseInt(data.id);

    findStudent(id);

    students = students.map((s) => {
      if (id === s.id) {
        return { ...data, id: newId };
      }

      return s;
    });

    return findStudent(newId);
  }

  function addStudent(data) {
    const lastStudent = students[students.length - 1];
    let nextId = 1;

    if (lastStudent) {
      nextId = parseInt(lastStudent.id + 1);
    }

    const newStudent = { id: nextId, ...data };

    students = students.concat(newStudent);

    return newStudent;
  }

  function deleteStudent(id) {
    findStudent(id);

    students = students.filter((s) => {
      return s.id !== id;
    });

    return true;
  }

  function findStudent(id) {
    const student = students.find((s) => s.id === parseInt(id));

    if (!student) {
      throw new Error(`Student with ID of ${id} was not found.`);
    }

    return student;
  }

  return {
    addStudent,
    findStudent,
    updateStudent,
    deleteStudent,
    findAllStudent,
    replaceStudent,
    findStundentClasses,
  }
}

module.exports = init;
