import React, { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link, useParams} from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

export default function  ShowProduct() {

  const { id } = useParams()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)

  useEffect(()=>{
    fetchProduct()
  },[])

  const fetchProduct = async () => {
    await axios.get(`http://localhost:8000/api/products/${id}`).then(({data})=>{
      const { title, description, image } = data.product
      setTitle(title)
      setDescription(description)
      setImage(image)
    }).catch(({response:{data}})=>{
      Swal.fire({
        text:data.message,
        icon:"error"
      })
    })
  }



  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Show Product</h4>
              <hr />

                  <Row> 
                      <Col>
                          <h5 className="card-title">Title</h5>
                          <p className="card-text">{title}</p>
                      </Col>
                      <Col>
                        <Link className='btn btn-primary mb-2 float-end' to={"/"}>
                            Product List
                        </Link>
                      </Col>
                  </Row>
                  <Row className="my-3">
                      <Col>
                          <h5 className="card-title">Description</h5>
                          <p className="card-text">{description}</p>
                      </Col>
                  </Row>

              <div>
                <img className="card-img-top" width="150px" alt='' src={`http://localhost:8000/storage/product/image/${image}`}/>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}