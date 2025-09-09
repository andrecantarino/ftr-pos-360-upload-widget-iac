import * as aws from '@pulumi/aws';
import { randomBytes } from 'crypto';

export function generateRandomHash(size: number = 7): string {
  const bytesNeeded = Math.ceil(size * 0.5);
  return randomBytes(bytesNeeded).toString('hex').slice(0, size);
}

const bucketHashName = generateRandomHash();

const firstBucket = new aws.s3.BucketV2(`primeiro-bucket-${bucketHashName}`, {
  bucket: `primeiro-bucket-pos-full-stack-360-${bucketHashName}`,
  tags: {
    IAC: 'true',
  },
});

const ecr = new aws.ecr.Repository(`primeiro-ecr-${bucketHashName}`, {
  name: `primeiro-ecr-${bucketHashName}`,
  imageTagMutability: 'IMMUTABLE',
  tags: {
    IAC: 'true',
  }
});

export const firstBucketName = firstBucket.id;
export const firstBucketRegion = firstBucket.region;
export const firstBucketArn = firstBucket.arn;

export const ecrName = ecr.name;
export const ecrRepositoryUrl = ecr.repositoryUrl;