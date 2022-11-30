<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  <a href="http://graphql.org/" target="blank"><img src="https://graphql.org/img/brand/logos/logo.svg" width="200" alt="Graphql Logo" /></a>
</p>

<br/>

<h1 align="center">Registrador de pontos</h1>

<h2 align="center"> Sistema para o gerenciamento de registros de ponto dos colaboradores de uma empresa.</h2>

<br>

# Tabela de conteúdos

<!--ts-->

- [Como usar](#como-usar)
  - [Pre Requisitos](#pré-requisitos)
  - [Rodar Aplicação](#-rodando-a-aplicação)
- [Tecnologias](#-tecnologias)
- [Observações](#observação)
<!--te-->

---

## Como usar

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).

---

### 🎲 Rodando a aplicação

```bash
# Clone este repositório
$ git clone https://github.com/mrdiniz88/point-records

# Acesse a pasta do projeto no terminal/cmd
$ cd point-records

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run start:dev

# Para executar os testes da aplicação
$ npm test
```

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [NestJS](http://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [Graphql](http://graphql.org/)

## Observação

Obtive um problema a testar a subscription no insomnia, porém tudo corre bem quando é testado no playground.

Deixei um usuário admin padrão ja salvo no banco de dados, pois apenas usuarios com permisão de admnistrador pode criar novos usuarios.
Para fazer login com o mesmo:
email: admin@gmail.com
password: admin123
