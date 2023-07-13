import { Table, Button } from "reactstrap"


const TablaContacto = ({ data, setEditar, mostrarModal, setMostrarModal, eliminarContacto }) => {
    const enviarDatos = (contacto) => {
        setEditar(contacto)//almacenar la informacion del contacto que necesitamos editar
        setMostrarModal(!mostrarModal)

    }

    return (

        <Table striped responsive>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Telefono</th>
                    <ht></ht>
                </tr>
            </thead>
            <tbody>

                {
                    (data.length < 1) ? (
                        <tr>
                            <td colSpan="4">Sin registros</td>
                        </tr>
                    ) : (

                        data.map((item) => (
                            <tr key={item.idContacto}>
                                <td>{item.nombre}</td>
                                <td>{item.correo}</td>
                                <td>{item.telefono}</td>
                                <td>
                                    <Button color="primary" size="sm" ClassName="me-2"
                                        onClick={() => enviarDatos(item)}
                                    >Editar</Button>
                                    <Button color="danger" size="sm"
                                        onClick={()=> eliminarContacto(item.idContacto) }
                                    >Eliminar</Button>

                                </td>
                            </tr>
                        ))

                    )
                }
            </tbody>
        </Table>


    )
}

export default TablaContacto;