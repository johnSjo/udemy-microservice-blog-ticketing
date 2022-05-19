import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export async function hash(string: string) {
  const salt = randomBytes(8).toString('hex');
  const buffer = (await scryptAsync(string, salt, 64)) as Buffer;

  return `${buffer.toString('hex')}.${salt}`;
}

export async function compare(stored: string, input: string) {
  const [storedHash, salt] = stored.split('.');
  const buffer = (await scryptAsync(input, salt, 64)) as Buffer;

  return buffer.toString('hex') === storedHash;
}
