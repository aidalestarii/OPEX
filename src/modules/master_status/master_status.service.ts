import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMasterStatusDto } from './dto/create-master_status.dto';
import { UpdateMasterStatusDto } from './dto/update-master_status.dto';
import { PrismaService } from 'src/core/service/prisma.service';

@Injectable()
export class MasterStatusService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMasterStatusDto: CreateMasterStatusDto) {
    try {
      const status = await this.prisma.mStatus.create({
        data: createMasterStatusDto,
      });
      return {
        data: status,
        meta: null,
        message: 'Master status created successfully',
        status: HttpStatus.CREATED,
        time: new Date(),
      };
    } catch (error) {
      throw new HttpException(
        {
          data: null,
          meta: null,
          message: 'Failed to create master status',
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          time: new Date(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    const status = await this.prisma.mStatus.findMany();
    return {
      data: status,
      meta: null,
      message: 'All master status retrieved',
      status: HttpStatus.OK,
      time: new Date(),
    };
  }

  async findOne(id: number) {
    const status = await this.prisma.mStatus.findUnique({
      where: { idStatus: id },
    });
    if (!status) {
      throw new HttpException(
        {
          data: null,
          meta: null,
          message: 'Master status not found',
          status: HttpStatus.NOT_FOUND,
          time: new Date(),
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      data: status,
      meta: null,
      message: 'Master status found',
      status: HttpStatus.OK,
      time: new Date(),
    };
  }

  async update(id: number, updateMasterStatusDto: UpdateMasterStatusDto) {
    //Validation ID
    const existingMasterStatus = await this.prisma.mStatus.findUnique({
      where: { idStatus: id },
    });
    if (!existingMasterStatus) {
      throw new NotFoundException(`Master status with ID ${id} not found`);
    }
    try {
      const updatedStatus = await this.prisma.mStatus.update({
        where: { idStatus: id },
        data: updateMasterStatusDto,
      });
      return {
        data: updatedStatus,
        meta: null,
        message: 'Master status updated successfully',
        status: HttpStatus.OK,
        time: new Date(),
      };
    } catch (error) {
      throw new HttpException(
        {
          data: null,
          meta: null,
          message: 'Failed to update master status',
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          time: new Date(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    const existingMasterStatus = await this.prisma.mStatus.findUnique({
      where: { idStatus: id },
    });
    if (!existingMasterStatus) {
      throw new NotFoundException(`Master status with id ${id} not found`);
    }
    try {
      const deleteStatus = await this.prisma.mStatus.delete({
        where: { idStatus: id },
      });
      return {
        data: deleteStatus,
        meta: null,
        message: 'Master status deleted successfully',
        status: HttpStatus.OK,
        time: new Date(),
      };
    } catch (error) {
      throw new HttpException(
        {
          data: null,
          meta: null,
          message: 'Failed to delete master status',
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          time: new Date(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
