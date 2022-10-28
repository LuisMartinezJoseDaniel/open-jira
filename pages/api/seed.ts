import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedData } from '../../database';
import { Entry } from '../../models';

//* LOS SEED SOLO EN DESARROLLO

type Data = {
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  //* Evitar ejecutar el SEED en produccion
  if ( process.env.NODE_ENV === 'production' ) {
    return res.status( 401 ).json( {
      message: 'No tiene acceso a este servicio'
    });
  }

  //* EJECUTAR ESTE ARCHIVO SOLO EN DESARROLLO
  await db.connect();

  await Entry.deleteMany(); //!Eliminar todos los Entries de la base de datos
  await Entry.insertMany( seedData.entries ); //Insertar data ficticia

  await db.disconnect();
  
  res.status( 200 ).json( { message: 'Proceso realizado correctamente' } )
}