
/*
  /relations (GET) - get all
  /relations/:id (GET) - get single by id
  /relations/ (POST) - create
  /relations/ (PATCH) - update
  /relations/:id (DELETE) - remove single by id
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
  pool.query('insert into relations (pid, cid) values ($1, $2) returning id;', [req.body.pid, req.body.cid], (err, resp) => {
    if (err) {
       throw err;
    }
    var newlyCreatedUserId = resp.rows[0].id;
    res.status(200).send(resp);
  });
});

router.get('/', (req, res) => {
  pool.query('SELECT * FROM RELATIONS;', (err, resp) => {
    if (err) {
      throw err;
    }

    res.status(200).send(resp.rows);
  })
});


router.get('/:id', (req, res) => {
  pool.query('SELECT * FROM RELATIONS WHERE ID=$1', [req.params.id], (err, rows) => {
    if (err) {
      throw err;
    }

    res.status(200).send(rows.rows[0]);
  })
});

router.delete('/:id', (req, res) => {
  pool.query('DELETE FROM RELATIONS WHERE ID=$1', [req.params.id], (err, rows) => {
    if (err){
      throw err;
    }
    res.status(200).send(rows);
  })
})

module.exports = router;
