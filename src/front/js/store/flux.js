const getState = ({ getStore, getActions, setStore }) => {
	let url_author = process.env.BACKEND_URL + "api/author/"
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			Authors: [],
			temp: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getData: () => {
				fetch(url_author)
					.then(response => response.json())
					.then(data => {
						setStore({ Authors: data });
						console.log("data de dev");
						console.log(data.results);
					})
					.catch(error => console.error("Error fetching Authors:", error));
			},

//---------------------------------------

			addAuthor: (props) => {
				const actions = getActions()
				const store = getStore();
				if (store.temp.length === 0) {
					const requestOptions = {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							'name': props.name,
							'description': props.description,
							'photo': props.photo
						})
					}
					fetch(url_author, requestOptions)
						.then((Response) => Response.json())
						.then(() => actions.getData())
						.catch((error) => {
							console.error("Error fetching the data:", error);
						});
				} else {
					actions.changeAuthor(props)
				}
			},
			deleteAuthor: (props) => {
				const actions = getActions()
				console.log("you are going to delete " + props)
				fetch(url_author+props, { method: 'DELETE' })
					.then(() => { actions.getData() });

			},
			changeAuthor: (props) => {
				const store = getStore();
				const actions = getActions()
				const requestOptions = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						'name': props.name,
						'description': props.description,
						'photo': props.photo
					}),
					redirect: "follow"
				};
				fetch(url_author+store.temp.id, requestOptions)
					.then(response => response.json())
					.then(data => {
						actions.getData()
						console.log(store.temp.id)
						setStore({ temp: [] })
					});

			},
			setid: (props) => {
				setStore({ temp: props })
				console.log(props)
			},

//---------------------------------------

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
