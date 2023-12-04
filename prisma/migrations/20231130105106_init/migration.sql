/*
  Warnings:

  - You are about to drop the column `cost_center` on the `budget` table. All the data in the column will be lost.
  - You are about to drop the column `gl_account` on the `budget` table. All the data in the column will be lost.
  - You are about to drop the column `group_detail` on the `budget` table. All the data in the column will be lost.
  - You are about to drop the column `group_gl` on the `budget` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `m_gl_account` table. All the data in the column will be lost.
  - You are about to drop the column `statusToId` on the `realization` table. All the data in the column will be lost.
  - You are about to drop the `ReallocationCorporate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReallocationCorporateItem` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[years,gl_account_id,cost_center_id]` on the table `budget` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bidang]` on the table `m_cost_center` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cost_center_id` to the `budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gl_account_id` to the `budget` table without a default value. This is not possible if the table is not empty.
  - Made the column `created_by` on table `file_upload` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `status_to_id` to the `realization` table without a default value. This is not possible if the table is not empty.
  - Made the column `updated_at` on table `realization_invest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_by` on table `realization_item` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "StatusEnum" ADD VALUE 'OPEN';

-- DropForeignKey
ALTER TABLE "ReallocationCorporate" DROP CONSTRAINT "fk_m_status_to_reallocation_corporate";

-- DropForeignKey
ALTER TABLE "ReallocationCorporate" DROP CONSTRAINT "fk_m_status_to_reallocation_corporate1";

-- DropForeignKey
ALTER TABLE "ReallocationCorporateItem" DROP CONSTRAINT "fk_m_cost_center_to_reallocation_corporate_item";

-- DropForeignKey
ALTER TABLE "ReallocationCorporateItem" DROP CONSTRAINT "fk_m_cost_center_to_reallocation_corporate_item1";

-- DropForeignKey
ALTER TABLE "ReallocationCorporateItem" DROP CONSTRAINT "fk_m_gl_account_to_reallocation_corporate_item";

-- DropForeignKey
ALTER TABLE "ReallocationCorporateItem" DROP CONSTRAINT "fk_m_gl_account_to_reallocation_corporate_item1";

-- DropForeignKey
ALTER TABLE "ReallocationCorporateItem" DROP CONSTRAINT "fk_reallocation_corporate_to_reallocation_corporate_item";

-- DropForeignKey
ALTER TABLE "budget" DROP CONSTRAINT "fk_m_cost_center_to_budget";

-- DropForeignKey
ALTER TABLE "budget" DROP CONSTRAINT "fk_m_gl_account_to_budget";

-- DropForeignKey
ALTER TABLE "realization" DROP CONSTRAINT "fk_m_status_to_realization1";

-- DropIndex
DROP INDEX "budget_constraint";

-- AlterTable
ALTER TABLE "budget" DROP COLUMN "cost_center",
DROP COLUMN "gl_account",
DROP COLUMN "group_detail",
DROP COLUMN "group_gl",
ADD COLUMN     "cost_center_id" INTEGER NOT NULL,
ADD COLUMN     "gl_account_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "file_upload" ALTER COLUMN "created_by" SET NOT NULL;

-- AlterTable
ALTER TABLE "m_gl_account" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "realization" DROP COLUMN "statusToId",
ADD COLUMN     "status_to_id" INTEGER NOT NULL,
ALTER COLUMN "no_request" SET DATA TYPE TEXT,
ALTER COLUMN "title_request" SET DATA TYPE VARCHAR,
ALTER COLUMN "department" DROP NOT NULL;

-- AlterTable
ALTER TABLE "realization_invest" ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "realization_item" ALTER COLUMN "created_by" SET NOT NULL;

-- DropTable
DROP TABLE "ReallocationCorporate";

-- DropTable
DROP TABLE "ReallocationCorporateItem";

-- CreateTable
CREATE TABLE "m_var" (
    "id_kurs" SERIAL NOT NULL,
    "unique_id" UUID NOT NULL,
    "value1" DOUBLE PRECISION NOT NULL,
    "value2" DOUBLE PRECISION NOT NULL,
    "value3" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(50),
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(50),

    CONSTRAINT "m_var_pkey" PRIMARY KEY ("id_kurs")
);

-- CreateTable
CREATE TABLE "reallocation_corporate" (
    "id_reallocation_corporate" SERIAL NOT NULL,
    "unique_id" UUID NOT NULL,
    "years" INTEGER NOT NULL,
    "ta_reff" INTEGER,
    "status" "StatusEnum" NOT NULL DEFAULT 'PROGRESS',
    "status_id" INTEGER NOT NULL,
    "department" VARCHAR(8) NOT NULL,
    "nopeg" VARCHAR(8) NOT NULL,
    "id_status_to" INTEGER NOT NULL,
    "department_to" VARCHAR(8) NOT NULL,
    "nopeg_to" VARCHAR(8) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(50) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(50),

    CONSTRAINT "reallocation_corporate_pkey" PRIMARY KEY ("id_reallocation_corporate")
);

-- CreateTable
CREATE TABLE "reallocation_corporate_item" (
    "id_reallocation_corporate_item" SERIAL NOT NULL,
    "unique_id" UUID NOT NULL,
    "reallocation_budget_id" INTEGER NOT NULL,
    "cost_center_id" INTEGER NOT NULL,
    "gl_account_id" INTEGER NOT NULL,
    "cost_center_to_id" INTEGER NOT NULL,
    "gl_account_to_id" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(50) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(50),

    CONSTRAINT "reallocation_corporate_item_pkey" PRIMARY KEY ("id_reallocation_corporate_item")
);

-- CreateIndex
CREATE UNIQUE INDEX "m_var_unique_id_key" ON "m_var"("unique_id");

-- CreateIndex
CREATE UNIQUE INDEX "reallocation_corporate_unique_id_key" ON "reallocation_corporate"("unique_id");

-- CreateIndex
CREATE INDEX "reallocation_budget_constraint" ON "reallocation_corporate"("years");

-- CreateIndex
CREATE UNIQUE INDEX "reallocation_corporate_item_unique_id_key" ON "reallocation_corporate_item"("unique_id");

-- CreateIndex
CREATE UNIQUE INDEX "budget_constraint" ON "budget"("years", "gl_account_id", "cost_center_id");

-- CreateIndex
CREATE UNIQUE INDEX "m_cost_center_bidang_key" ON "m_cost_center"("bidang");

-- AddForeignKey
ALTER TABLE "budget" ADD CONSTRAINT "fk_m_cost_center_to_budget" FOREIGN KEY ("cost_center_id") REFERENCES "m_cost_center"("id_cost_center") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "budget" ADD CONSTRAINT "fk_m_gl_account_to_budget" FOREIGN KEY ("gl_account_id") REFERENCES "m_gl_account"("id_gl_account") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "realization" ADD CONSTRAINT "fk_m_status_to_realization1" FOREIGN KEY ("status_to_id") REFERENCES "m_status"("id_status") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reallocation_corporate" ADD CONSTRAINT "fk_m_status_to_reallocation_corporate" FOREIGN KEY ("status_id") REFERENCES "m_status"("id_status") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reallocation_corporate" ADD CONSTRAINT "fk_m_status_to_reallocation_corporate1" FOREIGN KEY ("id_status_to") REFERENCES "m_status"("id_status") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reallocation_corporate_item" ADD CONSTRAINT "fk_m_cost_center_to_reallocation_corporate_item" FOREIGN KEY ("cost_center_id") REFERENCES "m_cost_center"("id_cost_center") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reallocation_corporate_item" ADD CONSTRAINT "fk_m_cost_center_to_reallocation_corporate_item1" FOREIGN KEY ("cost_center_to_id") REFERENCES "m_cost_center"("id_cost_center") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reallocation_corporate_item" ADD CONSTRAINT "fk_m_gl_account_to_reallocation_corporate_item" FOREIGN KEY ("gl_account_id") REFERENCES "m_gl_account"("id_gl_account") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reallocation_corporate_item" ADD CONSTRAINT "fk_m_gl_account_to_reallocation_corporate_item1" FOREIGN KEY ("gl_account_to_id") REFERENCES "m_gl_account"("id_gl_account") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reallocation_corporate_item" ADD CONSTRAINT "fk_reallocation_corporate_to_reallocation_corporate_item" FOREIGN KEY ("reallocation_budget_id") REFERENCES "reallocation_corporate"("id_reallocation_corporate") ON DELETE NO ACTION ON UPDATE NO ACTION;
