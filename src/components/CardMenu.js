import React from 'react'
import { Card } from 'react-bootstrap'

function CardMenu(props){
  return(

<Card
style={{ width: '18rem' }}
onClick={props.sendToCart}
>
  <Card.Img variant="top" src="holder.js/100px180" />
  <Card.Body>
    <Card.Title>{props.data.name}</Card.Title>
    <Card.Text>
    {props.data.price}
    </Card.Text>
  </Card.Body>
</Card>

  )
}

export default CardMenu