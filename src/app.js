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

const format = (response) => (data) => {
   response.format({
    'default': () => {
      response.json(data);
    },
    'application/json': () => {
      response.json(data);
    },
    'text/csv': () => {
      response.send(toCSV(data));
    },
    'text/html': () => {
      response.send(toHTML(data));
    },
  });
};

app.get('/students', (request, response) => {
  const students = model.findAllStudent();

  format(response)(students);
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

  format(response)(student);
});

app.get('/students/:id/classes', (request, response) => {
  const { id: studentId } = request.params;

  const classes = model.findStundentClasses(parseInt(studentId));

  format(response)(classes);
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

  format(response)(student);
});

app.post('/students', (request, response) => {
  const student = model.addStudent(request.body);

  try {
    makeValidate(['name', 'email'])(request.body);
  } catch (err) {
    response.status(400).send(message);

    return;
  }

  format(response)(student);
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

  format(response)(student);
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
