/*
  Warnings:

  - The values [UANG] on the enum `RealizationTypeEnum` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `cost_center_id` on the `budget` table. All the data in the column will be lost.
  - You are about to drop the column `gl_account_id` on the `budget` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[years,gl_account,cost_center]` on the table `budget` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cost_center` to the `budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gl_account` to the `budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `group_detail` to the `budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `group_gl` to the `budget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RealizationTypeEnum_new" AS ENUM ('UANG_MUKA', 'ENTERTAINMENT', 'PENGADAAN', 'QUALITY', 'FACILITY', 'ICT', 'REIMBURSEMENT');
ALTER TABLE "realization" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "realization" ALTER COLUMN "type" TYPE "RealizationTypeEnum_new" USING ("type"::text::"RealizationTypeEnum_new");
ALTER TYPE "RealizationTypeEnum" RENAME TO "RealizationTypeEnum_old";
ALTER TYPE "RealizationTypeEnum_new" RENAME TO "RealizationTypeEnum";
DROP TYPE "RealizationTypeEnum_old";
ALTER TABLE "realization" ALTER COLUMN "type" SET DEFAULT 'UANG_MUKA';
COMMIT;

-- DropForeignKey
ALTER TABLE "budget" DROP CONSTRAINT "fk_m_cost_center_to_budget";

-- DropForeignKey
ALTER TABLE "budget" DROP CONSTRAINT "fk_m_gl_account_to_budget";

-- DropIndex
DROP INDEX "budget_constraint";

-- DropIndex
DROP INDEX "realization_constraint";

-- DropIndex
DROP INDEX "realization_item_constraint";

-- AlterTable
ALTER TABLE "approval" ALTER COLUMN "created_by" DROP NOT NULL;

-- AlterTable
ALTER TABLE "budget" DROP COLUMN "cost_center_id",
DROP COLUMN "gl_account_id",
ADD COLUMN     "cost_center" VARCHAR(20) NOT NULL,
ADD COLUMN     "gl_account" DECIMAL NOT NULL,
ADD COLUMN     "group_detail" VARCHAR(50) NOT NULL,
ADD COLUMN     "group_gl" VARCHAR(20) NOT NULL,
ALTER COLUMN "value13" DROP NOT NULL,
ALTER COLUMN "value14" DROP NOT NULL,
ALTER COLUMN "value15" DROP NOT NULL,
ALTER COLUMN "value16" DROP NOT NULL,
ALTER COLUMN "created_by" DROP NOT NULL;

-- AlterTable
CREATE SEQUENCE file_upload_table_id_seq;
ALTER TABLE "file_upload" ALTER COLUMN "table_id" SET DEFAULT nextval('file_upload_table_id_seq'),
ALTER COLUMN "created_by" DROP NOT NULL;
ALTER SEQUENCE file_upload_table_id_seq OWNED BY "file_upload"."table_id";

-- AlterTable
ALTER TABLE "m_gl_account" ALTER COLUMN "group_gl" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "m_status" ALTER COLUMN "department" DROP NOT NULL;

-- AlterTable
CREATE SEQUENCE realization_no_draft_seq;
ALTER TABLE "realization" ALTER COLUMN "no_draft" SET DEFAULT nextval('realization_no_draft_seq'),
ALTER COLUMN "type" SET DEFAULT 'UANG_MUKA',
ALTER COLUMN "department_to" DROP NOT NULL,
ALTER COLUMN "nopeg_to" DROP NOT NULL;
ALTER SEQUENCE realization_no_draft_seq OWNED BY "realization"."no_draft";

-- AlterTable
ALTER TABLE "realization_item" ALTER COLUMN "created_by" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "budget_constraint" ON "budget"("years", "gl_account", "cost_center");

-- AddForeignKey
ALTER TABLE "budget" ADD CONSTRAINT "fk_m_cost_center_to_budget" FOREIGN KEY ("cost_center") REFERENCES "m_cost_center"("costCenter") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "budget" ADD CONSTRAINT "fk_m_gl_account_to_budget" FOREIGN KEY ("gl_account") REFERENCES "m_gl_account"("glAccount") ON DELETE NO ACTION ON UPDATE NO ACTION;
