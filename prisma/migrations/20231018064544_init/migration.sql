/*
  Warnings:

  - A unique constraint covering the columns `[unique_id]` on the table `m_cost_center` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[unique_id]` on the table `m_gl_account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[unique_id]` on the table `t_budget` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "FileUploadTypeEnum" AS ENUM ('HPS_DOCUMENT', 'PROFITABILITY_ANALYST', 'OTHER', 'BUDGET_RKAP');

-- AlterTable
ALTER TABLE "m_cost_center" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "m_gl_account" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "m_kurs" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "t_budget" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "file_upload" (
    "id" SERIAL NOT NULL,
    "unique_id" UUID NOT NULL,
    "doc_name" VARCHAR(255) NOT NULL,
    "doc_size" DOUBLE PRECISION NOT NULL,
    "doc_type" "FileUploadTypeEnum" NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(255) NOT NULL,
    "department_by" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP,
    "updated_by" VARCHAR(255),

    CONSTRAINT "file_upload_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "file_upload_unique_id_key" ON "file_upload"("unique_id");

-- CreateIndex
CREATE UNIQUE INDEX "m_cost_center_unique_id_key" ON "m_cost_center"("unique_id");

-- CreateIndex
CREATE UNIQUE INDEX "m_gl_account_unique_id_key" ON "m_gl_account"("unique_id");

-- CreateIndex
CREATE UNIQUE INDEX "t_budget_unique_id_key" ON "t_budget"("unique_id");
