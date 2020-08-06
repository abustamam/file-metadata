import { NextApiRequest } from 'next';
import formidable from 'formidable';

interface IField {
  [field: string]: string;
}

interface ParsedForm {
  fields: IField;
  files: any;
}

export const parseForm = (req: NextApiRequest) =>
  new Promise<ParsedForm>((resolve, reject) => {
    const form = formidable();
    form.parse(req, (err, fields, files) => {
      console.log('err', err);
      if (err) {
        return reject(err);
      }
      return resolve({ fields, files });
    });
  });
