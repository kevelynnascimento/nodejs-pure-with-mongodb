import { CommentService } from '../domain/services/comment.service';
import { inject } from 'inversify';
import {
  BaseHttpController,
  IHttpActionResult,
  controller,
  httpGet,
  httpPost,
  queryParam,
  requestBody,
  requestParam,
} from 'inversify-express-utils';

@controller('/comments')
export class CommentController extends BaseHttpController {
  constructor(
    @inject(CommentService) private readonly commentService: CommentService,
  ) {
    super();
  }

  @httpPost('/')
  public async create(@requestBody() request: any): Promise<IHttpActionResult> {
    try {
      const comment = await this.commentService.create(request);
      return this.json(comment, 200);
    } catch (err) {
      return this.json(
        {
          message: 'Internal Server Error!',
        },
        500,
      );
    }
  }

  @httpGet('/')
  public async filter(@queryParam() request: any): Promise<IHttpActionResult> {
    try {
      const comments = await this.commentService.getAll(request);
      return this.json(comments, 200);
    } catch (err) {
      return this.json(
        {
          message: 'Internal Server Error!',
        },
        500,
      );
    }
  }

  @httpGet('/:id')
  public async getById(
    @requestParam('id') id: string,
  ): Promise<IHttpActionResult> {
    try {
      const comment = await this.commentService.getById(id);
      return this.json(comment, 200);
    } catch (err) {
      return this.json(
        {
          message: 'Internal Server Error!',
        },
        500,
      );
    }
  }

  @httpPost('/:id/like')
  public async like(
    @requestParam('id') id: string,
    @requestBody() request: any,
  ): Promise<IHttpActionResult> {
    try {
      const comment = await this.commentService.like(id, request);
      return this.json(comment, 200);
    } catch (err) {
      return this.json(
        {
          message: 'Internal Server Error!',
        },
        500,
      );
    }
  }

  @httpPost('/:id/unlike')
  public async unlike(
    @requestParam('id') id: string,
    @requestBody() request: any,
  ): Promise<IHttpActionResult> {
    try {
      const comment = await this.commentService.unlike(id, request);
      return this.json(comment, 200);
    } catch (err) {
      return this.json(
        {
          message: 'Internal Server Error!',
        },
        500,
      );
    }
  }
}
