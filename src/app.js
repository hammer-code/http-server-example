import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import intersection from 'lodash/intersection';

import toCSV from './csv';
import data from './data';
import init from './model';
import toHTML from './html';

const app = express();

const model = init(data);

app.use(cors('*'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const makeValidate = (requiredFields = []) => (data) => {
  const fields = Object.keys(data);
  const validRequestedFields = intersection(requiredFields, fields);

  if (!validRequestedFields.length) {
    throw new Error(`Please provide valid fields. Required fields: ${requiredFields.join(', ')}`);
  }
};

app.get('/students', (request, response) => {
  const students = model.findAllStudent();

  response.format({
    'default': () => {
      response.json(students);
    },
    'application/json': () => {
      response.json(students);
    },
    'text/csv': () => {
      response.send(toCSV(students));
    },
    'text/html': () => {
      response.send(toHTML(students));
    },
  })
});

app.get('/students/:id', (request, response) => {
  const { id: studentId } = request.params;

  let student;

  try {
    student = model.findStudent(parseInt(studentId));
  } catch (err) {
    response.status(404).send(err.message);

    return;
  }

  response.format({
    'default': () => {
      response.json(student);
    },
    'application/json': () => {
      response.json(student);
    },
    'text/csv': () => {
      response.send(toCSV(student));
    },
    'text/html': () => {
      response.send(toHTML(student));
    },
  })
});

app.get('/students/:id/classes', (request, response) => {
  const { id: studentId } = request.params;

  const classes = model.findStundentClasses(parseInt(studentId));

  response.format({
    'default': () => {
      response.json(classes);
    },
    'application/json': () => {
      response.json(classes);
    },
    'text/csv': () => {
      response.send(toCSV(classes));
    },
    'text/html': () => {
      response.send(toHTML(classes));
    },
  })
});

app.patch('/students/:id', (request, response) => {
  const { id: studentId } = request.params;

  let student;

  try {
    student = model.updateStudent(parseInt(studentId), request.body);
  } catch (err) {
    response.status(404).send(err.message);

    return;
  }

  response.format({
    'default': () => {
      response.json(student);
    },
    'application/json': () => {
      response.json(student);
    },
    'text/csv': () => {
      response.send(toCSV(student));
    },
    'text/html': () => {
      response.send(toHTML(student));
    },
  });
});

app.post('/students', (request, response) => {
  const student = model.addStudent(request.body);

  try {
    makeValidate(['name', 'email'])(request.body);
  } catch (err) {
    response.status(400).send(message);

    return;
  }

  response.format({
    'default': () => {
      response.json(student);
    },
    'application/json': () => {
      response.json(student);
    },
    'text/csv': () => {
      response.send(toCSV(student));
    },
    'text/html': () => {
      response.send(toHTML(student));
    },
  });
});

app.put('/students/:id', (request, response) => {
  const { id: studentId } = request.params;

  try {
    makeValidate(['id', 'name', 'email'])(request.body);
  } catch (err) {
    response.status(400).send(err.message);

    return;
  }

  let student;

  try {
    student = model.replaceStudent(parseInt(studentId), request.body);
  } catch (err) {
    response.status(404).send(err.message);

    return;
  }

  response.format({
    'default': () => {
      response.json(student);
    },
    'application/json': () => {
      response.json(student);
    },
    'text/csv': () => {
      response.send(toCSV(student));
    },
    'text/html': () => {
      response.send(toHTML(student));
    },
  })
});

app.delete('/students/:id', (request, response) => {
  const { id: studentId } = request.params;

  try {
    model.deleteStudent(parseInt(studentId));
  } catch (err) {
    response.status(400).send(err.message);

    return;
  }

  response.status(204).send();
});

export default app;
