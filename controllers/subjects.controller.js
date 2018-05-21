
/*
  /subjects (GET) - get all
  /subjects/:id (GET) - get single by id
  /subjects/ (POST) - create
  /subjects/ (PATCH) - update
  /subjects/:id (DELETE) - remove single by id

  if we need shared new logic we can add new part for our route

  /subject/:id/relations -- returns all relation for single subject
*/

const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const connectionString

const pool = new Pool({
  connectionString: connectionString,
});

router.post('/', (req, res) => {
  if (!req.body) {
    throw new Error('ERR_MISSING_BODY');
  }
  const sqlQuery = 'insert into subjects ' + 
  '(name, semester, work_program, control_type, credits, hours_lections, ' + 
  'hours_labs, hours_seminars, hours_individual, hours_consultations, hours_practice, hours_self, hours_prod) ' +
  'values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id;'
  const sqlArgs = [
    req.body.name, req.body.semester, req.body.work_program, req.body.control_type, req.body.credits,
    req.body.hours_lections, req.body.hours_labs, req.body.hours_seminars, req.body.hours_individual, req.body.hours_consultations, 
    req.body.hours_practice, req.body.hours_self, req.body.hours_prod
  ]
  pool.query(sqlQuery, sqlArgs, (err, resp) => {
    if (err) {
       throw err;
    }
    var newlyCreatedUserId = resp.rows[0].id;
    res.status(200).send(resp);
    console.log(newlyCreatedUserId);
  });
});

router.get('/', (req, res) => {
  pool.query('SELECT * FROM SUBJECTS', (err, resp) => {
    if (err) {
      throw err;
    }

    res.status(200).send(resp.rows);
  })
});


router.get('/:id', (req, res) => {
  pool.query('SELECT * FROM SUBJECTS WHERE ID=$1', [req.params.id], (err, rows) => {
    if (err) {
      throw err;
    }

    res.status(200).send(rows);
  })
});

router.delete('/:id', (req, res) => {
  pool.query('DELETE FROM SUBJECTS WHERE ID=$1', [req.params.id], (err, rows) => {
    if (err){
      throw err;
    }
    res.status(200).send(rows);
  })
})

module.exports = router;
