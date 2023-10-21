import { auth } from "../../../../auth"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await auth(req, res)
  res.send(JSON.stringify(session, null, 2))
}