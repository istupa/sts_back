
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

  pool.query('insert into subjects (name) values ($1) RETURNING id;', [req.body.name], (err, resp) => {
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

router.get('/:id/relations', (req, res) => {
  var relationsObj = {}
  pool.query('select parentid, name from relations inner join subjects on parentid=id where childid=$1', [req.params.id], (err, rows) => {
    if (err) {
      throw err;
    }
    relationsObj.parents = rows.rows
    pool.query('select childid, name from relations inner join subjects on childid=id where parentid=$1', [req.params.id], (err, rows) => {
      if (err) {
        throw err;
      }
      relationsObj.childs = rows.rows
      res.status(200).send(relationsObj);
    })
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
