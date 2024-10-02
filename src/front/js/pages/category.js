import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { Context } from "../store/appContext"; // Asegúrate de importar el contexto

export const Category = () => {
    const { store, actions } = useContext(Context); // Obtén el store y las acciones del contexto
    const [showModal, setShowModal] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: "", description: "" });
    const [editMode, setEditMode] = useState(false);
    const [currentCategoryId, setCurrentCategoryId] = useState(null);

    // Cargar categorías al montar el componente
    useEffect(() => {
        actions.loadCategories();
    }, [actions]);

    // Función para agregar o editar una categoría
    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        if (editMode) {
            await actions.editCategory(currentCategoryId, newCategory);
        } else {
            await actions.newCategory(newCategory);
        }
        setNewCategory({ name: "", description: "" }); // Limpiar el formulario
        setShowModal(false); // Cerrar el modal
        setEditMode(false); // Restablecer el modo de edición
        setCurrentCategoryId(null);
    };

    // Función para abrir el modal en modo de edición
    const openEditModal = (category) => {
        setNewCategory({ name: category.name, description: category.description });
        setCurrentCategoryId(category.id);
        setEditMode(true);
        setShowModal(true);
    };

    // Función para eliminar una categoría
    const handleDeleteCategory = async (id) => {
        await actions.deleteCategory(id);
    };

    return (
        <div className="container">
            <h1 className="display-4">Categories</h1>
            <Button variant="primary" onClick={() => setShowModal(true)}>
                Add Category
            </Button>

            <hr className="my-4" />

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {store.categories.map((category, index) => (
                        <tr key={category.id || index}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td>
                                <Button variant="warning" onClick={() => openEditModal(category)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDeleteCategory(category.id)} className="mx-2">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal para agregar o editar una categoría */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editMode ? "Edit Category" : "Add New Category"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleCategorySubmit}>
                        <Form.Group controlId="categoryName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter category name"
                                value={newCategory.name}
                                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="categoryDescription" className="mt-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter category description"
                                value={newCategory.description}
                                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3">
                            {editMode ? "Update Category" : "Add Category"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Link to="/">
                <Button variant="secondary" className="mt-4">Back home</Button>
            </Link>
        </div>
    );
};
