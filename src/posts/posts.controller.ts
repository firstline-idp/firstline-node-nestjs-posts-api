import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AuthUser } from '../users/entities/auth-user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as Post_ } from './entity/post.entity';
import { PostsService } from './posts.service';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  private readonly logger = new Logger(PostsController.name);

  constructor(private readonly postsService: PostsService) {}

  //@Roles(Role.)
  @Get()
  getMyPosts(@CurrentUser() authUser: AuthUser): Post_[] {
    return this.postsService.findMyPosts(authUser);
  }

  //@Roles(Role.)
  @HttpCode(200)
  @Get(':id')
  getById(@CurrentUser() authUser: AuthUser, @Param('id') _id: string): Post_ {
    return this.postsService.findById(authUser, _id);
  }

  //@Roles(Role.)
  @HttpCode(201)
  @Post()
  create(
    @CurrentUser() authUser: AuthUser,
    @Body() createPostDto: CreatePostDto,
  ): Post_ {
    return this.postsService.create(authUser, createPostDto.text);
  }

  //@Roles(Role.)
  @HttpCode(200)
  @Patch(':id')
  update(
    @CurrentUser() authUser: AuthUser,
    @Param('id') _id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Post_ {
    return this.postsService.updateById(authUser, _id, updatePostDto.text);
  }

  //@Roles(Role.)
  @HttpCode(200)
  @Delete(':id')
  delete(@CurrentUser() authUser: AuthUser, @Param('id') _id: string): void {
    this.postsService.deleteById(authUser, _id);
  }
}

