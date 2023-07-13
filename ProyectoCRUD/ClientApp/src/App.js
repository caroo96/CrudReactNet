import { useEffect, useState } from "react";
import { Col, Container, Row, Card, CardHeader, CardBody, Button } from "reactstrap";
import ModalContacto from "./componentes/ModalContacto";
import TablaContacto from "./componentes/TablaContacto"

const App = () => {

    const [contactos, setContactos] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false);
    const [editar, setEditar] = useState(null)

    //metodo mostrar lista contactos
    const mostrarContactos = async () => {
        const response = await fetch("api/contacto/Lista");

        if (response.ok) {
            const data = await response.json();
            setContactos(data)
        } else {
            console.log("Error en la lista")
        }
    }

    //Metodo para mostrar contactos al iniciar la aplicación
    useEffect(() => {
        mostrarContactos()
    }, [])

    //Función para guardar contacto
    const guardarContacto = async (contacto) => {
        const response = await fetch("api/contacto/Guardar", {
            method: 'POST',
            headers: {
                'content-type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(contacto) //convertir el contacto en json
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarContactos();

        }
    }

    //funcion para editar contactos
    const editarContacto = async (contacto) => {
        const response = await fetch("api/contacto/Editar", {
            method: 'PUT',
            headers: {
                'content-type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(contacto)
        });

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarContactos();
        }
    }

    //funcion para eliminar contactos
    const eliminarContacto = async (id) => {

        var respuesta = window.confirm("¿Deseas eliminar el contacto?")
        if (!respuesta) {
            return;
        }

        const response = await fetch("api/contacto/Eliminar/" + id, {
            method: "DELETE",

        })

        if (response.ok) {
            mostrarContactos();
        }
    };



    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Lista de Contactos</h5>
                        </CardHeader>
                        <CardBody>
                            <Button size="sm" color="success"
                                onClick={() => setMostrarModal(!mostrarModal)}
                            >Nuevo Contacto</Button>
                            <hr></hr>
                            <TablaContacto data={contactos}
                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setMostrarModal={setMostrarModal}
                                eliminarContacto={eliminarContacto }

                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <ModalContacto
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                guardarContacto={guardarContacto}
                editar={editar}
                setEditar={setEditar}
                editarContacto={editarContacto}

            />
        </Container>
    )

}

export default App;