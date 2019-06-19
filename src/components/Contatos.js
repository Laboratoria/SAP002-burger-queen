import React from 'react'

const Contatos = props => {
    return (
      <div id='contact' className='container-fluid bg-grey'>
					<h2 className='text-center'>Fale Conosco</h2>
				<div className='row'>
					<div className='col-sm-5'>
						<p>Entre em contato conosco para reclamacoes, duvidas ou sugestoes.</p>
						<p><span className='glyphicon glyphicon-map-marker'></span> Sao Paulo, SP</p>
						<p><span className='glyphicon glyphicon-phone'></span> +011 966666666</p>
						<p><span className='glyphicon glyphicon-envelope'></span> faleconosco@burgerqueen.com</p>
					</div>
					<div className='col-sm-7 '>
						<div className='row'>
							<div className='col-sm-6 form-group'>
								<input className='form-control' id='name' name='name' placeholder='Digite seu nome' type='text' required />
							</div>
							<div className='col-sm-6 form-group'>
								<input className='form-control' id='email' name='email' placeholder='Digite seu email' type='email' required />
							</div>
						</div>
						<textarea className='form-control' id='comments' name='comments' placeholder='Escreva seu comentario' rows='5'></textarea><br />
						<div className='row'>
							<div className='col-sm-12 form-group'>
								<button className='btn btn-default pull-right' type='submit'>Enviar</button>
							</div>
						</div>
					</div>
				</div>
			</div>
    )
}

export default Contatos;
