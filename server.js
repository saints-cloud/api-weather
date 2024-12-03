const express = require('express');
const request = require('request');

const app = express();

app.get('/', (req, res) => {
  let city = req.query.city;

  const apiKey = '2c992cd42fa6924a5a9e29ed630a2a08'
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  // Realizar a requisição para o OpenWeatherMap´
  request(url, function(error, response, body) {
    if (error){
      res.status(500).send('Erro na requisição para o OpenWeatherMap.');
      return;
    }
    

  // Tratamento da resposta da API
    if (response.statusCode != 200){
      res.status(response.statusCode).send(`Erro na API: ${response.statusCode}`);
      return;
    }

  // Processamento de dados recebidos
    try {
      let data = JSON.parse(body);

      if (data.list && data.list.length > 0 && data.list[0].weather && data.list[0].weather[0]) {
        res.send(`O clima em sua cidade "${city}" é ${data.list[0].weather[0].description}.`);
      } else {
        res.status(404).send('Não foi possível obter informações de clima para essa cidade.');
      }
    } catch (err) {
      res.status(500).send('Erro ao processar a resposta da API.');
    }
  });
});

app.listen(3000, () => console.log('Server started on port 3000.'))