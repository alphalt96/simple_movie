import { Client } from 'minio';

export const minioClient = new Client({
  endPoint: 's3.amazonaws.com',
  accessKey: 'AKIA6LRJHMWMS2SV7RET',
  region: 'us-east-2',
  secretKey: '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',
});
