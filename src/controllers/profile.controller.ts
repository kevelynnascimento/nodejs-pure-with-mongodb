import { ProfileService } from '../domain/services/profile.service';
import {
  controller,
  httpGet,
  httpPost,
  requestBody,
  BaseHttpController,
  requestParam,
  queryParam,
  IHttpActionResult,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { IProfileGettingAllRequest } from '../domain/dtos/profile/requests/profile-getting-all.request';
import { IProfileCreationRequest } from '../domain/dtos/profile/requests/profile-creation.request';

@controller('/profiles')
export class ProfileController extends BaseHttpController {
  constructor(
    @inject(ProfileService) private readonly profileService: ProfileService,
  ) {
    super();
  }

  @httpPost('/')
  public async create(
    @requestBody() request: IProfileCreationRequest,
  ): Promise<IHttpActionResult> {
    try {
      const profile = await this.profileService.create(request);
      return this.json(profile, 200);
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
  public async getAll(
    @queryParam() request: IProfileGettingAllRequest,
  ): Promise<IHttpActionResult> {
    try {
      const profiles = await this.profileService.getAll(request);
      return this.json(profiles, 200);
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
      const profile = await this.profileService.getById(id);
      return this.json(profile, 200);
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
