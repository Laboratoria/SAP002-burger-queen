import React from 'react';
import { Card, Tab, Tabs} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import breakfastMenu from "../components/breakfastMenu"
import regularMenu from "../components/regularMenu"

  function Menu (props) {

    return (
      <Card className="" >
      <Card.Body>

        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3 grey-text">
          <Tab eventKey="home" title="Café da Manhã">
            {breakfastMenu.map((product, i, j) => {
              return (

                <Card className="m-1 d-inline-flex">
                  <Card.Body className="d-flex flex-column ">

                    <img src={product.foto} alt="Logo" className="img-size" />

                    <Card.Text className="d-flex flex-column grey-text-reg text-center text-small">
                      <span className="">{product.nome}</span>
                      <span className=""> R$ {product.preco},00 </span>
                    </Card.Text>
                    <div className="d-flex">
                      <button className="mx-1 btn btn-success" key={i} onClick={() => props.addItem(product)}><i className="fas fa-plus"></i></button>
                      <button className="mx-1 btn btn-danger" key={j} onClick={() => props.delItem(product)}><i className="fas fa-minus"></i></button>
                    </div>
                  </Card.Body>
                </Card>

              )
            })
            }
          </Tab>
          <Tab className="" eventKey="profile" title="Almoço/Jantar">
            {regularMenu.map((product, i, j) => {
              return (

                <Card className="m-1 d-inline-flex">
                  <Card.Body className="d-flex flex-column ">

                    <img src={product.foto} alt="Logo" className="img-size" />

                    <Card.Text className="d-flex flex-column grey-text text-center text-small">
                      <span className="">{product.nome}</span>
                      <span className=""> R$ {product.preco},00 </span>
                    </Card.Text>
                    <div className="d-flex">
                      <button className="mx-1 btn btn-success" key={i} onClick={() => props.addItem(product)}><i className="fas fa-plus"></i></button>
                      <button className="mx-1 btn btn-danger" key={j} onClick={() => props.delItem(product)}><i className="fas fa-minus"></i></button>
                    </div>
                  </Card.Body>
                </Card>
              )
            })
            }
          </Tab>
        </Tabs>

      </Card.Body>
    </Card>
    )
  }



export default Menu;