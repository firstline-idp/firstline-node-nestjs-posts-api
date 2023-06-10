import { NotFoundException } from '@nestjs/common';

export class PostNotFoundException extends NotFoundException {
  static byId(_id: string): PostNotFoundException {
    return new PostNotFoundException(
      `Post with id '${_id}' could not be found!`,
    );
  }
}

