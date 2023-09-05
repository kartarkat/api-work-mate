const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

const employees = [
  {
    id: 1,
    name: 'John Green',
    designation: 'CEO',
    team: 'Executive',
    manager: null,
  },
  {
    id: 2,
    name: 'Mark Hill',
    designation: 'CTO',
    team: 'Executive',
    manager: 1,
  },
  {
    id: 3,
    name: 'Joe Linux',
    designation: 'VP of Engineering',
    team: 'Engineering',
    manager: 2,
  },
  {
    id: 4,
    name: 'Ron Blomquist',
    designation: 'Lead Developer',
    team: 'Engineering',
    manager: 3,
  },
  {
    id: 5,
    name: 'Anna Smith',
    designation: 'Developer',
    team: 'Engineering',
    manager: 4,
  },
  {
    id: 6,
    name: 'David Johnson',
    designation: 'VP of Sales',
    team: 'Sales',
    manager: 2,
  },
  {
    id: 7,
    name: 'Emma Brown',
    designation: 'Sales Manager',
    team: 'Sales',
    manager: 6,
  },
  {
    id: 8,
    name: 'Michael Davis',
    designation: 'Account Executive',
    team: 'Sales',
    manager: 7,
  },
  {
    id: 9,
    name: 'Sophia Wilson',
    designation: 'HR Manager',
    team: 'HR',
    manager: 2,
  },
  {
    id: 10,
    name: 'Oliver Martin',
    designation: 'HR Coordinator',
    team: 'HR',
    manager: 9,
  }];

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hey this is my Recipes-API running 🤤',
  });
});

app.get('/employees', (req, res) => {
  res.json(employees);
});

app.get('/employees/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const employee = employees.find((rec) => rec.id === id);

  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ error: 'recipe not found' });
  }
});

app.post('/employees/update', (req, res) => {
  // Extract data from the request body
  const { employeeId, newManagerId } = req.body;

  // Find the employee by ID
  const employee = employees.find((emp) => parseInt(emp.id, 10) === employeeId);

  // Find the new manager by ID
  const newManager = employees.find((emp) => parseInt(emp.id, 10) === newManagerId);

  // Check if both employee and new manager exist
  if (!employee || !newManager) {
    return res.status(404).json({ error: 'Employee or new manager not found' });
  }

  if (parseInt(employee.manager, 10) !== newManagerId) {
    employee.manager = newManagerId;
  }

  // Update the employee's manager

  // Send a success response
  // res.json({ message: 'Employee manager updated successfully', employees });
  res.json(employees);
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
