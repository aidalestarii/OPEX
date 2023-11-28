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
      const costCenter = await this.prisma.mCostCenter.create({
        data: createMCostCenterDto,
      });
      return {
        data: costCenter,
        meta: null,
        message: 'Cost center created successfully',
        status: HttpStatus.CREATED,
        time: new Date(),
      };
    } catch (error) {
      throw new HttpException(
        {
          data: null,
          meta: null,
          message: 'Failed to create cost center',
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          time: new Date(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    const costCenter = await this.prisma.mCostCenter.findMany();
    return {
      data: costCenter,
      meta: null,
      message: 'All cost center retrieved',
      status: HttpStatus.OK,
      time: new Date(),
    };
  }

  async findOne(id: number) {
    const costCenter = await this.prisma.mCostCenter.findUnique({
      where: { idCostCenter: id },
    });
    if (!costCenter) {
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
      data: costCenter,
      meta: null,
      message: 'Cost Center found',
      status: HttpStatus.OK,
      time: new Date(),
    };
  }

  async findBidang(bidang: string) {
    const costCenter = await this.prisma.mCostCenter.findMany({
      where: { bidang: bidang },
    });
    if (!costCenter || costCenter.length === 0) {
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
      data: costCenter,
      meta: null,
      message: 'Cost Center found',
      status: HttpStatus.OK,
      time: new Date(),
    };
  }

  async groupingByDinas() {
    try {
      const costCenters = await this.prisma.mCostCenter.findMany({
        distinct: ['dinas'],
        orderBy: { dinas: 'asc' },
      });

      const costCenter = costCenters.map((costCenter) => costCenter.dinas);

      return {
        data: costCenter,
        meta: null,
        message: 'Cost Centers grouped by dinas',
        status: HttpStatus.OK,
        time: new Date(),
      };
    } catch (error) {
      throw new HttpException(
        {
          data: null,
          meta: null,
          message: 'Failed to group cost centers by dinas',
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          time: new Date(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateMCostCenterDto: UpdateMCostCenterDto) {
    //Validation ID
    const existingCostCenter = await this.prisma.mCostCenter.findUnique({
      where: { idCostCenter: id },
    });
    if (!existingCostCenter) {
      throw new NotFoundException(`Cost center with ID ${id} not found`);
    }
    try {
      const updatedCostCenter = await this.prisma.mCostCenter.update({
        where: { idCostCenter: id },
        data: updateMCostCenterDto,
      });
      return {
        data: updatedCostCenter,
        meta: null,
        message: 'Cost center updated successfully',
        status: HttpStatus.OK,
        time: new Date(),
      };
    } catch (error) {
      throw new HttpException(
        {
          data: null,
          meta: null,
          message: 'Failed to update cost center',
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          time: new Date(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    const existingCostCenter = await this.prisma.mCostCenter.findUnique({
      where: { idCostCenter: id },
    });
    if (!existingCostCenter) {
      throw new NotFoundException(`Cost center with id ${id} not found`);
    }
    try {
      const deleteCostCenter = await this.prisma.mCostCenter.delete({
        where: { idCostCenter: id },
      });
      return {
        data: deleteCostCenter,
        meta: null,
        message: 'Cost center deleted successfully',
        status: HttpStatus.OK,
        time: new Date(),
      };
    } catch (error) {
      throw new HttpException(
        {
          data: null,
          meta: null,
          message: 'Failed to delete cost center',
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          time: new Date(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
