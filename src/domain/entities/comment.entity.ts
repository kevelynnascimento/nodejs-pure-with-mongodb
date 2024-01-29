import { Document } from 'mongoose';

export class Like {
  id: string;
  profileId: string;
}

export class CommentEntity extends Document {
  id: string;
  title: string;
  description: string;
  mbti: string;
  enneagram: string;
  zodiac: string;
  creationDate: Date;
  numberOfLikes: number;
  likes: Like[];
  commentCreatorProfileId: string;
  votedProfileId: string;

  constructor() {
    super();
  }
}
