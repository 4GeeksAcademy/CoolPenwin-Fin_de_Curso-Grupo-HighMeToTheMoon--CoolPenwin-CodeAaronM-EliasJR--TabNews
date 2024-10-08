import React, {useContext} from "react";
import { Link } from "react-router-dom";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Context } from "../store/appContext";

export const CardAuthor = (props) => {
  const { store, actions } = useContext(Context);
  return(
<>
<div className="card m-2" style={{width: "18rem"}}>
  <img src={rigoImage} className="card-img-top" alt="..."/>
  <div className="card-body">
<Link to="/AddAuthor">
<button type="button" className="btn btn-outline-light text-secondary" onClick={() => actions.setid(props)}><i className="fa-solid fa-pencil"></i></button>
</Link>
<button type="button" className="btn btn-primary" onClick={() => actions.deleteAuthor(props.id)}>DELETE</button>
    <h5 className="card-title">{props.name}</h5>
    <p className="card-text m-0">description: {props.description}</p>
    <p className="card-text m-0">Hair color:{props.photo}</p>
  </div>
</div>

</>
);}