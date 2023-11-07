import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Service1 } from './get-all.service';
import { Service2 } from './get-all1.service';
import { Service3 } from './get-all2.service';
import { CreateGetAllDto } from './dto/create-get-all.dto';
import { UpdateGetAllDto } from './dto/update-get-all.dto';

@Controller('get-all')
export class GetAllController {
  constructor(
    private readonly service1: Service1,
    private readonly service2: Service2,
    private readonly service3: Service3,
  ) {}

  @Get()
  async findAll() {
    const data1 = await this.service1.findAll();
    const data2 = await this.service2.findAll();
    const data3 = await this.service3.findAll();

    console.log(data1);
    return {
      data1,
      data2,
      data3,
    };
  }
}
