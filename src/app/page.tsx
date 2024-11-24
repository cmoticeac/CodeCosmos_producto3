"use client";

import { push, ref, onValue, get, child } from 'firebase/database';
import { useState, useEffect } from 'react';
import { database } from './firebaseConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';

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
    <Row>
    <Col>
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {jugadores.length > 0 ? (
        jugadores.map((jugador:any) => (
          <div class="card text-center">
          <div class="card-body">
          <p class="card-text">
              <p>Nombre: {jugador.nombre}</p>
              <p>Posición: {jugador.posicion} </p> 
              <p>Edad: {jugador.edad} </p>
              <p>Partidos: {jugador.partidos}</p>
              <p>Sexo: {jugador.sexo}</p>
              <p>Video: {jugadores.video}</p>
          </p>
          <a href="#" class="btn btn-primary">Ver Detalles Jugador</a>
          </div>
          </div>
        ))
      ) : (
        <p>No hay jugadores disponibles.</p>
      )}
    </div>
    </Col>
    </Row>
    </Container>
  );
}
