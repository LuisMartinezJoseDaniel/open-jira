import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { db } from "../../../database";
import { Entry } from "../../../models";
import { Entry as IEntry } from "../../../interfaces";

type Data =
  | {
      message: string;
    }
  | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //* req.query para obtener los parametros de la url 
  const { id } = req.query; //Siempre son strings
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "El id no es valido" });
  }

  switch (req.method) {
    case "PUT":
      return updateEntry( req, res );
    case "GET":
      return getEntry( req, res );
    default:
      return res.status(400).json({ message: "El metodo no existe" });
  }

  res.status(200).json({ message: "Example" });
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query; //Siempre son strings
  await db.connect();
  // Buscar el entry
  const entryToUpdate = await Entry.findById(id);
  // Si no existe desconectar y mandar un bad request
  if (!entryToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: `No hay entrada con ese ID: ${id}` });
  }

  // Desestrusturar del req body la info a actualizar, si no viene usar la que ya existe
  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    //Buscar y Actualizar el objeto
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      // runValidator -> verificar que el status sea permitido
      // new -> para retornar el objeto actualizado
      { runValidators: true, new: true } //
    );
    // Segunda forma de actualizar
    // entryToUpdate.description = description;
    // entryToUpdate.status = status;
    // await entryToUpdate.save();
    await db.disconnect();
    return res.status(200).json(updatedEntry!);
  } catch (error: any) {
    await db.disconnect();
    return res.status( 400 ).json( { message: `Bad request ${error.errors.status.message}`  });
  }
};


const getEntry = async ( req:NextApiRequest, res : NextApiResponse)=>{
  const { id } = req.query;

  
  await db.connect();
  const entry = await Entry.findById( id );
  await db.disconnect();
  
  if ( !entry ) {
    return res.status( 400 ).json( { message: `El Entry con el id ${id} no existe` } )
  }
  
  return res.status( 200 ).json( entry );



}