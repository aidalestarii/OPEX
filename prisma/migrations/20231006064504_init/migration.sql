-- CreateEnum
CREATE TYPE "SignTitleEnum" AS ENUM ('approved_by', 'reviewed_by');

-- CreateEnum
CREATE TYPE "SignStatusEnum" AS ENUM ('approve', 'waiting_approval', 'revise', 'reject');

-- CreateEnum
CREATE TYPE "BudgetTypeEnum" AS ENUM ('rkap_budget', 'plan_realization', 'remaining_budget');

-- CreateEnum
CREATE TYPE "FileUploadTypeEnum" AS ENUM ('hps_document', 'profitability_analyst', 'other', 'budget_rkap');

-- CreateEnum
CREATE TYPE "TypeRealizationEnum" AS ENUM ('uang_muka', 'entertainment', 'pengadaan');

-- CreateEnum
CREATE TYPE "TypeReallocationEnum" AS ENUM ('internal_dinas', 'different_dinas_same_direktorat', 'different_dinas_different_direktorat');

-- CreateEnum
CREATE TYPE "StatusEnum" AS ENUM ('open', 'progress', 'closed', 'reject', 'revise');

-- CreateTable
CREATE TABLE "approval" (
    "id" SERIAL NOT NULL,
    "unique_id" UUID NOT NULL,
    "personal_number" VARCHAR(255) NOT NULL,
    "dinas" VARCHAR(255) NOT NULL,
    "sign_title" "SignTitleEnum" NOT NULL,
    "sign_status" "SignStatusEnum" NOT NULL,
    "no_request" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP,
    "updated_by" VARCHAR(255),
    "memo_id" INTEGER NOT NULL,
    "note_memo_id" INTEGER NOT NULL,

    CONSTRAINT "approval_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budget" (
    "id" SERIAL NOT NULL,
    "unique_id" UUID NOT NULL,
    "type" "BudgetTypeEnum" NOT NULL,
    "group" VARCHAR(255) NOT NULL,
    "group_detail" VARCHAR(255) NOT NULL,
    "gl_number" DOUBLE PRECISION NOT NULL,
    "dinas" VARCHAR(255) NOT NULL,
    "years" DATE NOT NULL,
    "month" DATE NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP,
    "updated_by" VARCHAR(255),

    CONSTRAINT "budget_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "memo" (
    "id" SERIAL NOT NULL,
    "unique_id" UUID NOT NULL,
    "memo_number" INTEGER NOT NULL,
    "from" VARCHAR(255) NOT NULL,
    "to" INTEGER NOT NULL,
    "note" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP,
    "updated_by" VARCHAR(255),

    CONSTRAINT "memo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "note_memo" (
    "id" SERIAL NOT NULL,
    "unique_id" UUID NOT NULL,
    "no_request" INTEGER NOT NULL,
    "memo_number" INTEGER NOT NULL,
    "from" VARCHAR(255) NOT NULL,
    "to" INTEGER NOT NULL,
    "note" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP,
    "updated_by" VARCHAR(255),

    CONSTRAINT "note_memo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "realization" (
    "id" SERIAL NOT NULL,
    "unique_id" UUID NOT NULL,
    "no_request" INTEGER NOT NULL,
    "dinas" VARCHAR(255) NOT NULL,
    "type_submission_enum" "TypeRealizationEnum" NOT NULL,
    "respinsible_request" VARCHAR(255) NOT NULL,
    "title_request" TEXT NOT NULL,
    "note_request" JSONB NOT NULL,
    "status" "StatusEnum" NOT NULL,
    "department_to" VARCHAR(255) NOT NULL,
    "status_to" VARCHAR(255) NOT NULL,
    "file_upload_id" INTEGER NOT NULL,
    "reallocation_id" INTEGER,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP,
    "updated_by" VARCHAR(255),
    "realization_item_id" INTEGER NOT NULL,
    "kurs_usd_id" INTEGER NOT NULL,

    CONSTRAINT "realization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "realization_item" (
    "id" SERIAL NOT NULL,
    "unique_id" UUID NOT NULL,
    "no_request" INTEGER NOT NULL,
    "group" VARCHAR(255) NOT NULL,
    "group_detail" VARCHAR(255) NOT NULL,
    "gl_number" VARCHAR(255) NOT NULL,
    "available" DOUBLE PRECISION NOT NULL,
    "amount_submission" DOUBLE PRECISION NOT NULL,
    "period_start" DATE NOT NULL,
    "period_finish" DATE NOT NULL,
    "description_pby" VARCHAR(255) NOT NULL,
    "remark_pby" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP,
    "updated_by" VARCHAR(255),
    "budget_id" INTEGER NOT NULL,
    "memo_id" INTEGER,
    "note_memo_id" INTEGER,

    CONSTRAINT "realization_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reallocation" (
    "id" SERIAL NOT NULL,
    "unique_id" UUID NOT NULL,
    "no_request" VARCHAR(255) NOT NULL,
    "ta_reff" INTEGER NOT NULL,
    "status" "StatusEnum" NOT NULL,
    "typeReallocationEnum" "TypeReallocationEnum" NOT NULL,
    "owner_budget" VARCHAR(255) NOT NULL,
    "desc_request" JSONB NOT NULL,
    "reallocation_item_id" INTEGER NOT NULL,
    "realization_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP,
    "updated_by" VARCHAR(255),

    CONSTRAINT "reallocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reallocation_item" (
    "id" SERIAL NOT NULL,
    "unique_id" UUID NOT NULL,
    "budget_id" INTEGER NOT NULL,
    "group_from" VARCHAR(255) NOT NULL,
    "group_detail" VARCHAR(255) NOT NULL,
    "gl_number" DOUBLE PRECISION NOT NULL,
    "available" DOUBLE PRECISION NOT NULL,
    "amount_submission" DOUBLE PRECISION NOT NULL,
    "group_to" VARCHAR(255) NOT NULL,
    "group_detail_to" VARCHAR(255) NOT NULL,
    "gl_number_to" DOUBLE PRECISION NOT NULL,
    "available_to" DOUBLE PRECISION NOT NULL,
    "recipient_total" DOUBLE PRECISION NOT NULL,
    "budget_name" VARCHAR(255) NOT NULL,
    "remark" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP,
    "updated_by" VARCHAR(255),

    CONSTRAINT "reallocation_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reallocation_corporate" (
    "id" SERIAL NOT NULL,
    "unique_id" UUID NOT NULL,
    "dinas_to" VARCHAR(255) NOT NULL,
    "title_note" TEXT NOT NULL,
    "note" VARCHAR(255) NOT NULL,
    "reallocation_item_corporate_id" INTEGER NOT NULL,
    "file_upload_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP,
    "updated_by" VARCHAR(255),

    CONSTRAINT "reallocation_corporate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reallocation_item_corporate" (
    "id" SERIAL NOT NULL,
    "unique_id" UUID NOT NULL,
    "budget_id" INTEGER NOT NULL,
    "group_from" VARCHAR(255) NOT NULL,
    "group_detail_from" VARCHAR(255) NOT NULL,
    "gl_number_from" DOUBLE PRECISION NOT NULL,
    "available_from" DOUBLE PRECISION NOT NULL,
    "amount_submission_from" DOUBLE PRECISION NOT NULL,
    "total_group_from" DOUBLE PRECISION NOT NULL,
    "total_amount_submission_from" DOUBLE PRECISION NOT NULL,
    "group_to" VARCHAR(255) NOT NULL,
    "group_detail_to" VARCHAR(255) NOT NULL,
    "gl_number_to" DOUBLE PRECISION NOT NULL,
    "available_to" DOUBLE PRECISION NOT NULL,
    "recipient_total" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP,
    "updated_by" VARCHAR(255),

    CONSTRAINT "reallocation_item_corporate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kurs_usd" (
    "id" SERIAL NOT NULL,
    "unique_id" UUID NOT NULL,
    "years" VARCHAR(255) NOT NULL,
    "kurs_from" VARCHAR(255) NOT NULL,
    "kurs_to" VARCHAR(255) NOT NULL,
    "available" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP,
    "updated_by" VARCHAR(255),

    CONSTRAINT "kurs_usd_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "approval_unique_id_key" ON "approval"("unique_id");

-- CreateIndex
CREATE UNIQUE INDEX "approval_personal_number_key" ON "approval"("personal_number");

-- CreateIndex
CREATE UNIQUE INDEX "budget_unique_id_key" ON "budget"("unique_id");

-- CreateIndex
CREATE UNIQUE INDEX "file_upload_unique_id_key" ON "file_upload"("unique_id");

-- CreateIndex
CREATE UNIQUE INDEX "memo_unique_id_key" ON "memo"("unique_id");

-- CreateIndex
CREATE UNIQUE INDEX "note_memo_unique_id_key" ON "note_memo"("unique_id");

-- CreateIndex
CREATE UNIQUE INDEX "realization_unique_id_key" ON "realization"("unique_id");

-- CreateIndex
CREATE UNIQUE INDEX "realization_item_unique_id_key" ON "realization_item"("unique_id");

-- CreateIndex
CREATE UNIQUE INDEX "reallocation_unique_id_key" ON "reallocation"("unique_id");

-- CreateIndex
CREATE UNIQUE INDEX "reallocation_item_unique_id_key" ON "reallocation_item"("unique_id");

-- CreateIndex
CREATE UNIQUE INDEX "reallocation_corporate_unique_id_key" ON "reallocation_corporate"("unique_id");

-- CreateIndex
CREATE UNIQUE INDEX "reallocation_item_corporate_unique_id_key" ON "reallocation_item_corporate"("unique_id");

-- CreateIndex
CREATE UNIQUE INDEX "kurs_usd_unique_id_key" ON "kurs_usd"("unique_id");

-- AddForeignKey
ALTER TABLE "approval" ADD CONSTRAINT "approval_memo_id_fkey" FOREIGN KEY ("memo_id") REFERENCES "memo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "approval" ADD CONSTRAINT "approval_note_memo_id_fkey" FOREIGN KEY ("note_memo_id") REFERENCES "note_memo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "realization" ADD CONSTRAINT "realization_file_upload_id_fkey" FOREIGN KEY ("file_upload_id") REFERENCES "file_upload"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "realization" ADD CONSTRAINT "realization_realization_item_id_fkey" FOREIGN KEY ("realization_item_id") REFERENCES "realization_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "realization" ADD CONSTRAINT "realization_kurs_usd_id_fkey" FOREIGN KEY ("kurs_usd_id") REFERENCES "kurs_usd"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "realization_item" ADD CONSTRAINT "realization_item_budget_id_fkey" FOREIGN KEY ("budget_id") REFERENCES "budget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "realization_item" ADD CONSTRAINT "realization_item_memo_id_fkey" FOREIGN KEY ("memo_id") REFERENCES "memo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "realization_item" ADD CONSTRAINT "realization_item_note_memo_id_fkey" FOREIGN KEY ("note_memo_id") REFERENCES "note_memo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reallocation" ADD CONSTRAINT "reallocation_reallocation_item_id_fkey" FOREIGN KEY ("reallocation_item_id") REFERENCES "reallocation_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reallocation" ADD CONSTRAINT "reallocation_realization_id_fkey" FOREIGN KEY ("realization_id") REFERENCES "realization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reallocation_corporate" ADD CONSTRAINT "reallocation_corporate_reallocation_item_corporate_id_fkey" FOREIGN KEY ("reallocation_item_corporate_id") REFERENCES "reallocation_item_corporate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reallocation_corporate" ADD CONSTRAINT "reallocation_corporate_file_upload_id_fkey" FOREIGN KEY ("file_upload_id") REFERENCES "file_upload"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reallocation_item_corporate" ADD CONSTRAINT "reallocation_item_corporate_budget_id_fkey" FOREIGN KEY ("budget_id") REFERENCES "budget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
