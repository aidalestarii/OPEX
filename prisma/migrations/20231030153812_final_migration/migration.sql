/*
  Warnings:

  - You are about to drop the `ReallocationBudget` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ReallocationBudget" DROP CONSTRAINT "fk_m_status_to_reallocation_budget";

-- DropForeignKey
ALTER TABLE "reallocation_budget_item" DROP CONSTRAINT "fk_reallocation_budget_to_reallocation_budget_item";

-- DropTable
DROP TABLE "ReallocationBudget";

-- CreateTable
CREATE TABLE "reallocation_budget" (
    "id_reallocation_budget" SERIAL NOT NULL,
    "unique_id" VARCHAR(20) NOT NULL,
    "years" INTEGER NOT NULL,
    "ta_reff" INTEGER NOT NULL,
    "id_status" INTEGER NOT NULL,
    "status" "StatusEnum" NOT NULL,
    "department" VARCHAR(8) NOT NULL,
    "nopeg" VARCHAR(8) NOT NULL,
    "department_to" VARCHAR(8) NOT NULL,
    "nopeg_to" VARCHAR(8) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(50) NOT NULL,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(50),

    CONSTRAINT "reallocation_budget_pkey" PRIMARY KEY ("id_reallocation_budget")
);

-- CreateIndex
CREATE UNIQUE INDEX "reallocation_budget_unique_id_key" ON "reallocation_budget"("unique_id");

-- CreateIndex
CREATE INDEX "reallocation_budget_idx" ON "reallocation_budget"("years");

-- AddForeignKey
ALTER TABLE "reallocation_budget" ADD CONSTRAINT "fk_m_status_to_reallocation_budget" FOREIGN KEY ("id_status") REFERENCES "m_status"("id_status") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reallocation_budget_item" ADD CONSTRAINT "fk_reallocation_budget_to_reallocation_budget_item" FOREIGN KEY ("id_reallocation_budget") REFERENCES "reallocation_budget"("id_reallocation_budget") ON DELETE NO ACTION ON UPDATE NO ACTION;
