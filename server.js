const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Sending the return information to the database

app.post('/postReturnInfo', async (req, res) => {
  try {
    // creating the current date

    const date = new Date();

    // sepersting the data and sending to two seperate tables

    const returnRequest = await pool.query(
      'INSERT INTO returnorders (returnnum, name, contact, requestdate ) values ($1, $2, $3, $4) returning *',
      [req.body.returnNo, req.body.name, req.body.contact, date]
    );

    const itemList = await req.body.items.forEach((item) => {
      // if item was not selected to return it will be filtered

      if (item.reason !== 'Keep' || !item.reason)
        pool.query(
          'INSERT INTO returningitems (itemnum, reason, name, returnnum, requestdate, size, colour) values ($1, $2, $3, $4, $5, $6, $7)',
          [
            item.item,
            item.reason,
            item.itemName,
            req.body.returnNo,
            date,
            item.size,
            item.colour,
          ]
        );
    });

    res.json(returnRequest.rows);
  } catch (error) {
    res.json('NO SUCCESS');
  }
});

// Fetch Items from order with date conditinol

app.post('/fetchOrderedItems', async (req, res) => {
  try {
    const ordNo = req.body.orderNum;
    const items = await pool.query(
      'SELECT * FROM ordereditems WHERE ordernum = $1',
      [ordNo]
    );
    if (items.rows.length > 0) {
      res.status(200).send(items.rows);
    } else {
      res.json('not found');
    }
  } catch (error) {
    res.json('not found');
  }
});

app.listen(3000, () => {
  console.log('hey');
});

// posible future routes for data handling

// SELECT ALL ITEMS WHERE REASON IS "example"
