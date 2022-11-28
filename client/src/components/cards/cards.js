import React from "react";
import "./card.css";
import FormDialog from "../dialog/dialogForm";

export default function Card(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <FormDialog
        open={open}
        setOpen={setOpen}
        nombre={props.nombre}
        apellido={props.apellido}
        email={props.email}
        listCard={props.listCard}
        setListCard={props.setListCard}
        id={props.id}
      />
      <div className="card-container" onClick={() => setOpen(true)}>
        <h1 className="card-nombre">{props.nombre}</h1>
        <p className="card-id">{props.id}</p>
        <p className="card-cartegory">{props.apellido}</p>
        <p className="card-cartegory">{props.email}</p>
      </div>
    </>
  );
}
