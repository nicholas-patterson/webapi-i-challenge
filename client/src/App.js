import React, { useEffect, useState } from "react";
import axios from "axios";
import Person from "./Person";

function App() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5050/api/users").then(res => {
      setPeople(res.data);
    });
  }, []);

  return (
    <div className="App">
      {people.map(person => {
        return <Person key={person.id} person={person} />;
      })}
    </div>
  );
}

export default App;
