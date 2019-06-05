const express = require('express');
const request = require('request');

const app = express();
const url = 'https://jsonplaceholder.typicode.com/users';

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      console.log(error);
      res.send('Erro ao pegar dados!');
    } else {
      let dadosSuite = [];
      let dadosNome = [];
      let websites = [];
      let arrayDados = response.body;
      arrayDados.filter(x => {
        let string = x.address.suite.toUpperCase();
        let substring = 'suite';
        let dadosweb = x.website;
        let nomes = {
          nome: x.name,
          email: x.email,
          empresa: x.company.name
        };
        websites.push(dadosweb);
        dadosNome.push(nomes);

        if (string.indexOf(substring.toUpperCase()) !== -1) {
          dadosSuite.push(x.username);
        }
      });

      dadosNome.sort((a, b) => {
        let textA = a.nome.toUpperCase();
        let textB = b.nome.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });

      let result = {
        websites: websites,
        dadosPorNome: dadosNome,
        dadosSuite: dadosSuite
      };
      res.json(result);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor no ar na porta ${PORT}`);
});
