import { Container } from 'inversify';
import { CommentService } from '../../domain/services/comment.service';
import { ProfileService } from '../../domain/services/profile.service';
import { CommentController } from '../../controllers/comment.controller';
import { ProfileController } from '../../controllers/profile.controller';
import { CommentRepository } from '../repositories/comment.repository';
import { ProfileRepository } from '../repositories/profile.repository';

export class ContainerConfig {
  private static container: Container;

  public static start(): Container {
    this.container = new Container();

    this.configureRepositories();
    this.configureServices();
    this.configureControllers();

    return this.container;
  }

  private static configureRepositories(): void {
    this.container.bind<CommentRepository>(CommentRepository).toSelf();
    this.container.bind<ProfileRepository>(ProfileRepository).toSelf();
  }

  private static configureServices(): void {
    this.container.bind<CommentService>(CommentService).toSelf();
    this.container.bind<ProfileService>(ProfileService).toSelf();
  }

  private static configureControllers(): void {
    this.container.bind<CommentController>(CommentController).toSelf();
    this.container.bind<ProfileController>(ProfileController).toSelf();
  }
}
