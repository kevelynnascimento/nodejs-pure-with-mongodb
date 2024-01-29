import { injectable } from 'inversify';
import { CommentModel } from '../../infrastructure/schemas/comment.schema';
import { CommentEntity } from '../../domain/entities/comment.entity';

@injectable()
export class CommentRepository {
  public async create(comment: CommentEntity): Promise<CommentEntity> {
    const newComment = await CommentModel.create(comment);
    return newComment;
  }

  public async getAll(request: any): Promise<CommentEntity[]> {
    const { page, limit, votedProfileId, mbti, enneagram, zodiac, sortBy } =
      request;

    const queryFilter: any = {};

    if (votedProfileId) queryFilter.votedProfileId = votedProfileId;

    if (mbti) queryFilter.mbti = mbti;

    if (enneagram) queryFilter.enneagram = enneagram;

    if (zodiac) queryFilter.zodiac = zodiac;

    const sortFilter: any =
      sortBy === 'numberOfLikes' ? { numberOfLikes: -1 } : { creationDate: -1 };

    const pageParam = +page ?? 1;
    const limitParam = +limit ?? 10;

    const comments = await CommentModel.find(queryFilter)
      .sort(sortFilter)
      .skip((pageParam - 1) * limitParam)
      .limit(limitParam);

    return comments;
  }

  public async getById(id: string): Promise<CommentEntity> {
    const comment = await CommentModel.findOne({ id: id });
    return comment;
  }
}
