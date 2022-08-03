import React from "react";
import "./Card.css";

function Card({ title, image }) {
  return (
    <div className="card-container">
      <div className="image-container">
        <img src={image}></img>
      </div>
      <div className="card-body">
        <h2>{title}</h2>
        <h5>Something of a text</h5>
        <button>Some button</button>
      </div>
    </div>
  );
}

export default Card;
