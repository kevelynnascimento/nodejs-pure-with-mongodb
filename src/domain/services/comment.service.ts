import { v4 as uuidv4 } from 'uuid';
import { CommentEntity } from '../entities/comment.entity';
import { inject, injectable } from 'inversify';
import { ICommentCreationResponse } from '../dtos/comment/responses/comment-creation.response';
import { ICommentFilteringResponse } from '../dtos/comment/responses/comment-filtering.response';
import { ICommentGettingByIdResponse } from '../dtos/comment/responses/comment-getting-by-id.response';
import { ICommentLikeResponse } from '../dtos/comment/responses/comment-like.response';
import { ICommentUnlikeResponse } from '../dtos/comment/responses/comment-unlike.response';
import { CommentRepository } from '../../infrastructure/repositories/comment.repository';

@injectable()
export class CommentService {
  constructor(
    @inject(CommentRepository)
    private readonly commentRepository: CommentRepository,
  ) {}

  public async create(request: any): Promise<ICommentCreationResponse> {
    const {
      title,
      description,
      mbti,
      enneagram,
      zodiac,
      commentCreatorProfileId,
      votedProfileId,
    } = request;

    const comment = {
      id: uuidv4(),
      title,
      description,
      mbti,
      enneagram,
      zodiac,
      creationDate: new Date(),
      numberOfLikes: 0,
      likes: [],
      commentCreatorProfileId,
      votedProfileId,
    } as CommentEntity;

    const newComment = await this.commentRepository.create(comment);

    const response = {
      id: newComment.id,
      title: newComment.title,
      description: newComment.description,
    };

    return response;
  }

  public async getAll(request: any): Promise<ICommentFilteringResponse[]> {
    const comments = await this.commentRepository.getAll(request);

    const response = comments.map(
      ({ id, title, description, mbti, enneagram, zodiac, numberOfLikes }) => ({
        id,
        title,
        description,
        mbti,
        enneagram,
        zodiac,
        numberOfLikes,
      }),
    );

    return response;
  }

  public async getById(id: string): Promise<ICommentGettingByIdResponse> {
    const comment = await this.commentRepository.getById(id);

    if (!comment) return null;

    const { title, description, mbti, enneagram, zodiac, numberOfLikes } =
      comment;

    const response = {
      id,
      title,
      description,
      mbti,
      enneagram,
      zodiac,
      numberOfLikes,
    };

    return response;
  }

  public async like(id: string, request: any): Promise<ICommentLikeResponse> {
    const { profileId } = request;

    const comment = await this.commentRepository.getById(id);

    if (!comment) {
      return {
        success: false,
      };
    }

    const alreadyLiked = comment.likes?.some(
      (like) => like.profileId === profileId,
    );

    if (!alreadyLiked) {
      const newLike = {
        id: uuidv4(),
        profileId: profileId,
      };

      comment.likes.push(newLike);
      comment.numberOfLikes++;

      try {
        await comment.save();
      } catch (error) {
        console.error('Error updating comment:', error);
      }
    }

    const response = {
      success: true,
    };

    return response;
  }

  public async unlike(
    id: string,
    request: any,
  ): Promise<ICommentUnlikeResponse> {
    const { profileId } = request;

    const comment = await this.commentRepository.getById(id);

    if (!comment) {
      return {
        success: false,
      };
    }

    const alreadyLiked = comment.likes?.some(
      (like) => like.profileId === profileId,
    );

    if (alreadyLiked) {
      comment.likes = comment.likes.filter(
        (like) => like.profileId !== profileId,
      );
      comment.numberOfLikes--;
      await comment.save();
    }

    const response = {
      success: true,
    };

    return response;
  }
}
