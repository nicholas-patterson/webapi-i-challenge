import React from "react";
import axios from "axios";

const Person = ({ person }) => {
  const deletePerson = id => {
    axios
      .delete(`http://localhost:5050/api/users/${id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <>
      <h2>Name: {person.name}</h2>
      <h4>Bio: {person.bio}</h4>
      <button onClick={() => deletePerson(person.id)}>Delete</button>
    </>
  );
};

export default Person;
