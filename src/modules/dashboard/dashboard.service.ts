import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { PrismaService } from 'src/core/service/prisma.service';
import { SortOrder } from '@elastic/elasticsearch/lib/api/types';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  create(createDashboardDto: CreateDashboardDto) {
    return 'This action adds a new dashboard';
  }

  async findAll() {
    const realization = await this.prisma.realization.findMany({
      include: {
        m_cost_center: true,
        realizationItem: true,
      },
    });

    const realizationWithAmount = realization.map((realizationItem) => {
      // Calculate total amount for each realization using reduce
      const totalAmount = realizationItem.realizationItem.reduce(
        (accumulator, currentItem) => accumulator + (currentItem.amount || 0),
        0,
      );

      return {
        idRealization: realizationItem.idRealization,
        requestNumber: realizationItem.requestNumber,
        entryDate: realizationItem.createdAt,
        m_cost_center: realizationItem.m_cost_center,
        status: realizationItem.status,
        typeSubmission: realizationItem.type,
        statusTo: realizationItem.personalNumberTo,
        departmentTo: realizationItem.departmentTo,
        submissionValue: totalAmount,
        description: realizationItem.titleRequest,
      };
    });

    return {
      data: realizationWithAmount,
      meta: null,
      message: 'All realization retrieved',
      status: HttpStatus.OK,
      time: new Date(),
    };
  }

  async findAllPaginated(page: number, perPage, order: string = 'asc') {
    if (!['asc', 'desc'].includes(order.toLowerCase())) {
      throw new BadRequestException(
        'Invalid order parameter. Use "asc" or "desc".',
      );
    }

    const skip = (page - 1) * perPage;

    const realization = await this.prisma.realization.findMany({
      skip,
      take: parseInt(perPage),
      orderBy: {
        updatedAt: order.toLowerCase() as SortOrder,
      },
      include: {
        m_cost_center: true,
        realizationItem: true,
      },
    });

    const totalItems = await this.prisma.realization.count();

    // Menghitung jumlah item yang tersisa pada halaman terakhir
    const remainingItems = totalItems % perPage;

    // Memeriksa apakah ini adalah halaman terakhir
    const isLastPage = page * perPage >= totalItems;

    const realizationWithFileUpload = realization.map((realizationItem) => {
      // Calculate total amount for each realization using reduce
      const totalAmount = realizationItem.realizationItem.reduce(
        (accumulator, currentItem) => accumulator + (currentItem.amount || 0),
        0,
      );

      return {
        idRealization: realizationItem.idRealization,
        requestNumber: realizationItem.requestNumber,
        entryDate: realizationItem.createdAt,
        m_cost_center: realizationItem.m_cost_center,
        status: realizationItem.status,
        typeSubmission: realizationItem.type,
        statusTo: realizationItem.personalNumberTo,
        departmentTo: realizationItem.departmentTo,
        submissionValue: totalAmount,
        description: realizationItem.titleRequest,
      };
    });

    return {
      data: realizationWithFileUpload,
      meta: {
        currentPage: Number(page),
        totalItems,
        lastpage: Math.ceil(totalItems / perPage),
        totalItemsPerPage: Number(isLastPage ? remainingItems : perPage),
      },
      message: 'Pagination dashboard retrieved',
      status: HttpStatus.OK,
      time: new Date(),
    };
  }

  async getRealizationTypeCounts() {
    const totalRealizations = await this.prisma.realization.count();

    const realizationTypeCounts = await this.prisma.realization.groupBy({
      by: ['status'],
      _count: true,
    });

    return realizationTypeCounts.map((countStatus) => ({
      type: countStatus.status,
      count: countStatus._count,
      percentage: Number(
        ((countStatus._count / totalRealizations) * 100).toFixed(2),
      ),
    }));
  }

  findOne(id: number) {
    return `This action returns a #${id} dashboard`;
  }

  update(id: number, updateDashboardDto: UpdateDashboardDto) {
    return `This action updates a #${id} dashboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} dashboard`;
  }
}
