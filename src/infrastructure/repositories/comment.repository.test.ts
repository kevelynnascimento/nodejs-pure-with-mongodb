import 'reflect-metadata';
import { CommentRepository } from './comment.repository';
import { Application } from 'express';
import { Bootstraper } from '../..';

jest.mock('../schemas/comment.schema');

describe('CommentRepository', () => {
  let app: Application;
  let commentService: CommentRepository;

  beforeAll(async () => {
    app = await Bootstraper.start(true);
  });

  beforeEach(() => {
    jest.clearAllMocks();

    commentService = new CommentRepository();
  });

  describe('create', () => {
    it('should create a new comment', async () => {});
  });
});
