import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { CardAuthor } from "../component/cardAuthor";


export const AddAuthor = () => {
	const { store, actions } = useContext(Context);
	const [name, setname] = useState("")
	const [description, setdescription] = useState("")
	const [photo, setphoto] = useState("")
	const [id, setid] = useState("")

	useEffect(() => {
		if (store.temp.length === 0) {
			console.log("se vacio el componente temporal")
		} else {
			setname(store.temp.name)
			setdescription(store.temp.description)
			setphoto(store.temp.photo)
			setid(store.temp.id)
		}
	}, [store.temp.name, store.temp.description, store.temp.photo])

	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!!</h1>
			<h1 className="text-danger">Authors</h1>


    <form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">name</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={name} onChange={(e) => (setname(e.target.value))}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">description</label>
    <input type="email" class="form-control" id="description" aria-describedby="emailHelp" value={description} onChange={(e) => (setdescription(e.target.value))}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">photo</label>
    <input type="email" class="form-control" id="photo" aria-describedby="emailHelp" value={photo} onChange={(e) => (setphoto(e.target.value))}/>
  </div>
</form>
<button className="btn btn-primary" onClick={(e) => { e.preventDefault(); actions.addAuthor({ name, description, photo, id}); }}>Save</button>
					<Link to="/">
						get back to home
					</Link>

			<div className="row d-flex flex-nowrap my-5" style={{ overflowX: "scroll" }}>
				{store.Authors.map((author, index) => <CardAuthor key={index}

					name={author.name}
					description={author.description}
					photo={author.photo}

				/>)}
			</div>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
		</div>
	);
};
