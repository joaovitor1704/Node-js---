import express from 'express';
import conectaNaDatabase from './config/dbConnect.js';
import livro from './models/livro.js';

const conexao = await conectaNaDatabase();

conexao.on("error", (erro) => {
  console.error("Erro na conexão com o banco de dados", erro);
});

conexao.once("open", () => {
  console.log("Conexão com o banco de dados estabelecida com sucesso");
});

const app = express();
app.use(express.json());

app.get('/', (req, res) => { 
  res.status(200).send('Curso de Node.js');
});

app.get('/livros', async (_req, res) => {
  const listaLivros = await livro.find({});
  res.status(200).json(listaLivros);
});

app.get('/livros/:id', (req, res) => {
  const index = buscaLivro(req.params.id);
  res.status(200).json(livros[index]);
});


app.post('/livros', (req, res) => {
    livros.push(req.body);
    res.status(201).send('Livro cadastrado com sucesso');
});

app.put('/livros/:id', (req, res) => {
  const index = buscaLivro(req.params.id);
  livros[index].titulo = req.body.titulo;
  livros[index].autor = req.body.autor;
  res.status(200).send(`Livro ${livros[index].titulo} atualizado com sucesso`);
});

app.delete('/livros/:id', (req, res) => {
  const index = buscaLivro(req.params.id);
  livros.splice(index, 1);
  res.status(200).send('Livro removido com sucesso');
});

export default app;

