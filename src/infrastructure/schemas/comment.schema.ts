import mongoose, { Schema } from 'mongoose';
import { CommentEntity } from '../../domain/entities/comment.entity';

const commentEntitySchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  mbti: { type: String, required: true },
  enneagram: { type: String, required: true },
  zodiac: { type: String, required: true },
  creationDate: { type: Date, required: true },
  numberOfLikes: { type: Number, required: true },
  likes: [
    new Schema({
      id: { type: String, required: true },
      profileId: { type: String, required: true },
    }),
  ],
  commentCreatorProfileId: { type: String, required: true },
  votedProfileId: { type: String, required: true },
});

commentEntitySchema.index({ numberOfLikes: 1 });
commentEntitySchema.index({ creationDate: -1 });
commentEntitySchema.index({ votedProfileId: 1 });
commentEntitySchema.index({ mbti: 1 });
commentEntitySchema.index({ enneagram: 1 });
commentEntitySchema.index({ zodiac: 1 });

const CommentModel = mongoose.model<CommentEntity>(
  'comment',
  commentEntitySchema,
);

export { CommentModel };
