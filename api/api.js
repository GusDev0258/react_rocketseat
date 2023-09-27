import http from "node:http";

const users = [];

/**
 * @param {http.IncomingMessage} request
 * @param {http.ServerResponse} response
 */
const server = http.createServer((request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const method = request.method;
  const resource = request.url;
  let body = "";
  request.on("data", (chunk) => {
    body += chunk;
  });

  request.on("end", () => {
    if (resource === "/users" && method === "GET") {
      response.write(JSON.stringify(users));
      //Listar usuários
    } else if (resource === "/users" && method === "POST") {
      const bodyAsObject = JSON.parse(body);
      console.log(body);
      const name = bodyAsObject.nome;
      const idade = bodyAsObject.idade;

      const user = {
        nome: name,
        idade,
      };

      users.push(user);
      response.statusCode = 201;
      //Criar usuário
    } else if (resource === "/users" && method === "PUT") {
      //Editar usuário
    } else if (resource === "/users" && method === "DELETE") {
      //Deletar usuário
    }
    response.end();
  });
});

server.listen(3333);
