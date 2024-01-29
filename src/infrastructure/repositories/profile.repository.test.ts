import 'reflect-metadata';
import { ProfileRepository } from './profile.repository';
import { Bootstraper } from '../..';
import { Application } from 'express';

jest.mock('../schemas/comment.schema');

describe('ProfileRepository', () => {
  let app: Application;
  let commentService: ProfileRepository;

  beforeAll(async () => {
    app = await Bootstraper.start(true);
  });

  beforeEach(() => {
    jest.clearAllMocks();

    commentService = new ProfileRepository();
  });

  describe('create', () => {
    it('should create a new comment', async () => {});
  });
});
