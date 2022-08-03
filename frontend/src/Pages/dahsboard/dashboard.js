// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import Card from "../../components/Card.js";
// import "../dahsboard/dashboard.css";

// function Dashboard() {
//   const [arr, setArr] = useState({});
//   const [items, setItems] = useState([]);
//   const [theme, setTheme] = useState("");

//   useEffect(() => {
//     axios.get("/dashboardStart").then((response) => {
//       setArr(response.data);
//     });
//     console.log("render");
//     setItems([]);
//   }, []);

//   function HandleClick(somet) {
//     setItems([]);
//     setTheme(somet);
//     axios.get("/getTracks", { params: { categ: somet } }).then((response) => {
//       axios
//         .get("/end", { params: { Pid: response.data.playlists.items[1].id } })
//         .then((response) => {
//           axios.get("/endTrack").then((response) => {});
//           setItems(response.data.items);
//         });
//     });
//   }

//   if (arr.categories != undefined && items != undefined) {
//     console.log("in");

//     return (
//       <div>
//         Success
//         {arr.categories.items.map((el) => {
//           return (
//             <div>
//               <div>
//                 <h2>{el.name}</h2>
//                 <a href={el.href}>{el.href}</a>
//                 <button onClick={() => HandleClick(el.id)}>Click me</button>
//                 <p>----------------------------</p>
//               </div>
//               {el.id == theme ? (
//                 <div className="row-for-card">
//                   {items.slice(0, 5).map((el) => {
//                     console.log(el);
//                     return (
//                       <div>
//                         <Card
//                           title={el.track.name}
//                           image={el.track.album.images[0].url}
//                         ></Card>
//                       </div>
//                     );
//                   })}
//                 </div>
//               ) : (
//                 ""
//               )}
//             </div>
//           );
//         })}
//       </div>
//     );
//   } else {
//     console.log("out");
//     return <div>Loading!</div>;
//   }
// }

// export default Dashboard;
import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "../../components/Card.js";
import Row from "../../components/Row.js";
import "../dahsboard/dashboard.css";

function Dashboard() {
  const [arr, setArr] = useState({});

  useEffect(() => {
    axios.get("/dashboardStart").then((response) => {
      setArr(response.data);
    });
  }, []);

  if (arr.categories != undefined) {
    return (
      <div>
        Success
        {arr.categories.items.splice(0, 5).map((el) => {
          return (
            <div>
              <div>
                <h2>{el.name}</h2>
                <a href={el.href}>{el.href}</a>
                <Row arrayCards={el.id}></Row>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div>Loading!</div>;
  }
}

export default Dashboard;
