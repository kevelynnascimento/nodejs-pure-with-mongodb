import 'reflect-metadata';
import { faker } from '@faker-js/faker';
import { CommentService } from './comment.service';
import { CommentModel } from '../../infrastructure/schemas/comment.schema';
import { Bootstraper } from '../../';

jest.mock('../../infrastructure/schemas/comment.schema');

describe('CommentService', () => {
  let commentService: CommentService;

  beforeAll(async () => {
    await Bootstraper.start(true);
  });

  beforeEach(() => {
    jest.clearAllMocks();

    commentService = new CommentService();
  });

  describe('create', () => {
    it('should create a new comment', async () => {
      const request = {
        title: faker.string.alpha(),
        description: faker.string.alpha(),
        mbti: faker.string.alpha(),
        enneagram: faker.string.alpha(),
        zodiac: faker.string.alpha(),
        commentCreatorProfileId: faker.string.uuid(),
        votedProfileId: faker.string.uuid(),
      };

      const newComment = {
        id: faker.string.uuid(),
        ...request,
        creationDate: faker.date.anytime(),
        numberOfLikes: faker.number.int(),
        likes: [],
      };

      (CommentModel.create as jest.Mock).mockResolvedValueOnce(newComment);

      const output = await commentService.create(request);

      expect(output).toEqual({
        id: output.id,
        title: output.title,
        description: output.description,
      });

      expect(CommentModel.create as jest.Mock).toHaveBeenCalled();
    });
  });
});
