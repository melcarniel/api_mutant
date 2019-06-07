const express = require('express');
const request = require('request');

const app = express();
const url = 'https://jsonplaceholder.typicode.com/users';

const PORT = process.env.PORT || 8080;
let arrayDados = [];

request({ url: url, json: true }, (error, response) => {
  if (error) {
    console.log(error);
  } else {
    arrayDados = response.body;
  }
});

app.get('/', (req, res) => {
  res.send(
    '<html><h3>Teste Mutant</h3><hr /><div><a href="/1">Item 1</a></div><div><a href="/2">Item 2</a></div><div><a href="/3">Item 3</a></div></html>'
  );
});

app.get('/1', (req, res) => {
  if (arrayDados.length == 0) {
    res.send('Não existe dados!');
  } else {
    let websites = [];
    arrayDados.filter(x => {
      let dadosweb = x.website;
      websites.push(dadosweb);
    });
    let result = {
      websites: websites
    };
    res.json(result);
  }
});

app.get('/2', (req, res) => {
  if (arrayDados.length == 0) {
    res.send('Não existe dados!');
  } else {
    let dadosNome = [];
    arrayDados.filter(x => {
      let nomes = {
        nome: x.name,
        email: x.email,
        empresa: x.company.name
      };
      dadosNome.push(nomes);
    });
    dadosNome.sort((a, b) => {
      let textA = a.nome.toUpperCase();
      let textB = b.nome.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    let result = {
      dadosPorNome: dadosNome
    };
    res.json(result);
  }
});

app.get('/3', (req, res) => {
  if (arrayDados.length == 0) {
    res.send('Não existe dados!');
  } else {
    let dadosSuite = [];
    arrayDados.filter(x => {
      let string = x.address.suite.toUpperCase();
      let substring = 'suite';
      if (string.indexOf(substring.toUpperCase()) !== -1) {
        dadosSuite.push(x.username);
      }
    });
    let result = {
      dadosSuite: dadosSuite
    };
    res.json(result);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor no ar na porta ${PORT}`);
});
