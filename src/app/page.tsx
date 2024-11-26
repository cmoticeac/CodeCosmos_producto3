"use client";

import { push, ref, onValue, get, child } from 'firebase/database';
import { useState, useEffect } from 'react';
import { database } from './firebaseConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

export default function Home() {
 
  const [jugadores, setJugadores]: any = useState<any[]>([]);

  const loadData = () => {
      const jugadoresRef = ref(database, 'jugadores');
      get(jugadoresRef).then((snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if (data) {
          const keys = Object.keys(data);
          // Convierte el objeto en un array
          const jugadoresArray = Object.keys(data).map((key) => ({
            id: key, // Agrega el ID como parte del objeto
            ...data[key],
          }));
          setJugadores(jugadoresArray);
        }
      });
      
  }; 
  useEffect(() => {
    loadData();
  }, []); 
  

  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h1 className="text-center mb-4">Lista Jugadores</h1>
        </Col>
      </Row>
      <Row>
        {jugadores.length > 0 ? (
          jugadores.map((jugador: any) => (
            <Col md={4} className="mb-4" key={jugador.id}>
              <Card>
                <Card.Body>
                  <Card.Title>{jugador.nombre}</Card.Title>
                  <Card.Text>
                    <strong>Posición:</strong> {jugador.posicion}
                    <br />
                    <strong>Edad:</strong> {jugador.edad}
                    <br />
                    <strong>Partidos:</strong> {jugador.partidos}
                    <br />
                    <strong>Sexo:</strong> {jugador.sexo}
                    <br />
                    <strong>Video:</strong> {jugador.video}
                  </Card.Text>
                  <Button variant="primary">Ver Detalles Jugador</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center">No hay jugadores disponibles.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
}
