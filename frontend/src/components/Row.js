import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card.js";
function Row({ arrayCards }) {
  const [dataItems, setDataItems] = useState([]);
  const [theme, setTheme] = useState("");

  useEffect(() => {
    setDataItems([]);
    axios
      .get("/getTracks", { params: { categ: arrayCards } })
      .then((response) => {
        axios
          .get("/end", { params: { Pid: response.data.playlists.items[0].id } })
          .then((response) => {
            setTheme(arrayCards);
            setDataItems(response.data.items);
          });
      });
  }, []);

  if (dataItems != undefined) {
    return (
      <div className="row-for-card">
        {dataItems.splice(0, 5).map((el) => {
          return (
            <div>
              <Card
                title={el.track.name}
                image={el.track.album.images[0].url}
              ></Card>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div>No Cards for you here.</div>;
  }
}

export default Row;
