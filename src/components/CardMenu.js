import React from 'react'
import { Card } from 'react-bootstrap'

function CardMenu(props){
  return(

<Card
style={{ width: '10rem' }}
onClick={props.sendToCart}
className="m-1 text-center" 
>
  {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
  <Card.Header>{props.item.nome}</Card.Header>
  <Card.Body>
    <Card.Text>R$ {props.item.preço} </Card.Text>
  </Card.Body>
</Card>

  )
}

export default CardMenu