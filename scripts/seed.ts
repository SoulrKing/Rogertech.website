import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Seed Social Metrics
  console.log('Criando métricas sociais...');
  
  await prisma.socialMetrics.upsert({
    where: { platform: 'tiktok' },
    update: {},
    create: {
      platform: 'tiktok',
      followers: 95.500,
    },
  });

  await prisma.socialMetrics.upsert({
    where: { platform: 'instagram' },
    update: {},
    create: {
      platform: 'instagram',
      followers: 15.500,
    },
  });

  await prisma.socialMetrics.upsert({
    where: { platform: 'youtube' },
    update: {},
    create: {
      platform: 'youtube',
      followers: 13.900,
    },
  });

  console.log('✅ Métricas sociais criadas!');
  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
