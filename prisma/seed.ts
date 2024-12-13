import { investmentTranches } from "../lib/data/mock-data";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const tranchesCount = await prisma.tranche.count();
  if (tranchesCount !== investmentTranches.length) {
    const tranches = await prisma.tranche.createMany({
      data: investmentTranches,
      skipDuplicates: true,
    });
    console.log({ tranches });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
