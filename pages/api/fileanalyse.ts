import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import middlewares from '../../middleware';
import { parseForm } from '../../src/util';

export const config = {
  api: { bodyParser: false },
};

const handler = nextConnect();
handler.use(middlewares);
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      files: {
        upfile: { name, size, type },
      },
    } = await parseForm(req);
    res.statusCode = 200;
    res.json({ name, size, type });
  } catch (err) {
    res.statusCode = 400;
    res.json({
      error: err,
      ok: false,
    });
  }
});

export default handler;
