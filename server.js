const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.post('/calculate', (req, res) => {
  const { country, electricity, electricityUnit, naturalGas, lpg } = req.body;

  const carbonFootprint = electricity * 0.5 + naturalGas * 2 + lpg * 1.5;

  res.json({ result: `Your carbon footprint in ${country}: ${carbonFootprint} kg CO2e` });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
