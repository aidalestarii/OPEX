-- AlterTable
ALTER TABLE "budget_reallocation" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "file_upload" ALTER COLUMN "unique_id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "m_kurs" ALTER COLUMN "unique_id" SET DATA TYPE VARCHAR(36);