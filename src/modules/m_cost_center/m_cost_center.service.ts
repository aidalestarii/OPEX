import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMCostCenterDto } from './dto/create-m_cost_center.dto';
import { UpdateMCostCenterDto } from './dto/update-m_cost_center.dto';
import { PrismaService } from 'src/core/service/prisma.service';

@Injectable()
export class MCostCenterService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMCostCenterDto: CreateMCostCenterDto) {
    try {
      const kurs = await this.prisma.mCostCenter.create({
        data: createMCostCenterDto,
      });
      return {
        data: kurs,
        meta: null,
        message: 'Kurs created successfully',
        status: HttpStatus.CREATED,
        time: new Date(),
      };
    } catch (error) {
      throw new HttpException(
        {
          data: null,
          meta: null,
          message: 'Failed to create kurs',
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          time: new Date(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    const data = await this.prisma.mCostCenter.findMany();
    return {
      data: data,
      meta: null,
      message: 'All kurs retrieved',
      status: HttpStatus.OK,
      time: new Date(),
    };
  }

  async findOne(id: number) {
    const kurs = await this.prisma.mCostCenter.findUnique({
      where: { idCostCenter: id },
    });
    if (!kurs) {
      throw new HttpException(
        {
          data: null,
          meta: null,
          message: 'Cost Center not found',
          status: HttpStatus.NOT_FOUND,
          time: new Date(),
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      data: kurs,
      meta: null,
      message: 'Cost Center found',
      status: HttpStatus.OK,
      time: new Date(),
    };
  }

  async update(id: number, updateMCostCenterDto: UpdateMCostCenterDto) {
    //Validation ID
    const existingCostCenter = await this.prisma.mCostCenter.findUnique({
      where: { idCostCenter: id },
    });
    if (!existingCostCenter) {
      throw new NotFoundException(`Cost Center with ID ${id} not found`);
    }
    try {
      const updatedKurs = await this.prisma.mCostCenter.update({
        where: { idCostCenter: id },
        data: updateMCostCenterDto,
      });
      return {
        data: updateMCostCenterDto,
        meta: null,
        message: 'Cost Center updated successfully',
        status: HttpStatus.OK,
        time: new Date(),
      };
    } catch (error) {
      throw new HttpException(
        {
          data: null,
          meta: null,
          message: 'Failed to update Cost Center',
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          time: new Date(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    const data = await this.prisma.mCostCenter.delete({
      where: { idCostCenter: id },
    });
    return { data };
  }
}
