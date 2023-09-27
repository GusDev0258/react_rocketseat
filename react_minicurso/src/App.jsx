import { useState } from "react";
import "./index.css";

function User(props) {
  return <h1>{props.name}</h1>;
}

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [userList, setUserList] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch(`http://localhost:3333/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: name,
        idade: age,
      }),
    }).then((response) => {
      handleUsers();
      console.log(response);
    });
  };
  const handleUsers = async () => {
    const req = await fetch(`http://localhost:3333/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await req.json();
    if (res) setUserList(res);
    console.log(res);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome: </label>
        <input
          type="text"
          name="nome"
          onChange={({ target }) => setName(target.value)}
        />
        <label htmlFor="idade">Idade: </label>
        <input
          type="number"
          name="idade"
          onChange={({ target }) => setAge(target.value)}
        />

        <button type="submit">Salvar</button>
      </form>
      <User name="Diego" />
      <User name={name} />
      <User name="Mônica" />
      {userList.length > 1 && userList.map((user, index) => <User key={index} name={user.nome} />)}
    </>
  );
}

export default App;
