// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string;
  method: string;
}

//* Solo se puede regresar una respuesta por peticion
//* Si se regresan dos respuestas, hay en error en los headers 

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe', method: req.method || "No hay metodo" })
}
