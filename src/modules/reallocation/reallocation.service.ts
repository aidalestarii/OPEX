import { Injectable } from '@nestjs/common';
import { CreateReallocationDto } from './dto/create-reallocation.dto';
import { UpdateReallocationDto } from './dto/update-reallocation.dto';

@Injectable()
export class ReallocationService {
  create(createReallocationDto: CreateReallocationDto) {
    return 'This action adds a new reallocation';
  }

  findAll() {
    return `This action returns all reallocation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reallocation`;
  }

  update(id: number, updateReallocationDto: UpdateReallocationDto) {
    return `This action updates a #${id} reallocation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reallocation`;
  }
}
