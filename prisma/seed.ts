import { glAccount, costCenters, status, docCategory } from './dummy-data';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  for (let costcenter of costCenters) {
    await prisma.mCostCenter.create({
      data: costcenter,
    });
  }

  for (let glaccount of glAccount) {
    await prisma.mGlAccount.create({
      data: glaccount,
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
