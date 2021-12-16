const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const fortunes = require('./data/fortunes.json');

const app = express();

app.use(bodyParser.json());

// get all the fortunes
app.get('/fortunes', (req, res) => {
  res.json(fortunes);
});

// get random fortune
app.get('/fortunes/random', (req, res) => {
  res.json(fortunes[Math.floor(Math.random() * fortunes.length)]);
});

// get specific fortune base on id
app.get('/fortunes/:id', (req, res) => {
  // console.log(req.params);

  res.json(fortunes.find((f) => f.id === Number(req.params.id)));
});

// write data to the json file function
const writeFortunes = json => {
  fs.writeFile('./data/fortunes.json', JSON.stringify(json), (err) => {
    if (err) {
      console.log(err);
    }
  });
}

// push new fortune
app.post('/fortunes', (req, res) => {
  // console.log(req.body);

  const { message, lucky_number, spirit_animal } = req.body;

  const fortune_ids = fortunes.map((f) => f.id);

  // add new fortune to the end of the old fortune
  const new_fortunes = fortunes.concat({
    id: (fortune_ids.length > 0 ? Math.max(...fortune_ids) : 0) + 1,
    message,
    lucky_number,
    spirit_animal,
  });

  // write data to the json file
  writeFortunes(new_fortunes)

  res.json(new_fortunes);
});

// update data
app.put('/fortunes/:id', (req, res) => {
  const { id } = req.params;
  // const { message, lucky_number, spirit_animal } = req.body;
  console.log(id)
  const old_fortune = fortunes.find((f) => f.id == id);

  ['message', 'lucky_number', 'spirit_animal'].forEach(key => {
    if(req.body[key]) old_fortune[key] = req.body[key]
  })

  // write data to the json file
  writeFortunes(fortunes)

  res.json(fortunes);
});

// delete data
app.delete('/fortunes/:id', (req, res) => {
  const { id } = req.params;

  const new_fortunes = fortunes.filter(f => f.id != id)

  writeFortunes(new_fortunes)

  res.json(new_fortunes)
})

module.exports = app;
