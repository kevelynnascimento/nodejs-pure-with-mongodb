import { Document } from 'mongoose';

export class ProfileEntity extends Document {
  id: string;
  name: string;
  description: string;
  mbti: string;
  enneagram: string;
  variant: string;
  tritype: number;
  socionics: string;
  sloan: string;
  psyche: string;
  image: string;

  constructor() {
    super();
  }
}
