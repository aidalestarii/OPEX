import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MasterStatusService } from './master_status.service';
import { CreateMasterStatusDto } from './dto/create-master_status.dto';
import { UpdateMasterStatusDto } from './dto/update-master_status.dto';

@Controller({
  version: '1',
  path: 'api/master-status',
})
export class MasterStatusController {
  constructor(private readonly masterStatusService: MasterStatusService) {}

  @Post()
  async create(@Body() data: CreateMasterStatusDto) {
    try {
      const newStatus = await this.masterStatusService.create(data);
      return newStatus;
    } catch (error) {
      // Tangkap kesalahan dan lemparkan HttpException
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  findAll() {
    return this.masterStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.masterStatusService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateMasterStatusDto: UpdateMasterStatusDto,
  ) {
    return this.masterStatusService.update(+id, updateMasterStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterStatusService.remove(+id);
  }
}
