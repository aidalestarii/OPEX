-- CreateTable
CREATE TABLE "t_budget" (
    "id_budget" SERIAL NOT NULL,
    "unique_id" VARCHAR(20) NOT NULL,
    "years" INTEGER NOT NULL,
    "id_gl_account" INTEGER NOT NULL,
    "id_cost_center" INTEGER NOT NULL,
    "value01" DOUBLE PRECISION NOT NULL,
    "value02" DOUBLE PRECISION NOT NULL,
    "value03" DOUBLE PRECISION NOT NULL,
    "value04" DOUBLE PRECISION NOT NULL,
    "value05" DOUBLE PRECISION NOT NULL,
    "value06" DOUBLE PRECISION NOT NULL,
    "value07" DOUBLE PRECISION NOT NULL,
    "value08" DOUBLE PRECISION NOT NULL,
    "value09" DOUBLE PRECISION NOT NULL,
    "value10" DOUBLE PRECISION NOT NULL,
    "value11" DOUBLE PRECISION NOT NULL,
    "value12" DOUBLE PRECISION NOT NULL,
    "value13" DOUBLE PRECISION NOT NULL,
    "value14" DOUBLE PRECISION NOT NULL,
    "value15" DOUBLE PRECISION NOT NULL,
    "value16" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "created_by" VARCHAR(20) NOT NULL,
    "updated_at" TIMESTAMP,
    "updated_by" VARCHAR(20),

    CONSTRAINT "t_budget_pkey" PRIMARY KEY ("id_budget")
);

-- CreateTable
CREATE TABLE "m_kurs" (
    "id_kurs" SERIAL NOT NULL,
    "unique_id" VARCHAR(20) NOT NULL,
    "years" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "created_by" VARCHAR(20) NOT NULL,
    "updated_at" TIMESTAMP,
    "updated_by" VARCHAR(20),

    CONSTRAINT "m_kurs_pkey" PRIMARY KEY ("id_kurs")
);

-- CreateTable
CREATE TABLE "m_cost_center" (
    "id_cost_center" SERIAL NOT NULL,
    "unique_id" VARCHAR(20) NOT NULL,
    "cost_center" VARCHAR(20) NOT NULL,
    "unit" VARCHAR(8) NOT NULL,
    "bidang" VARCHAR(8) NOT NULL,
    "dinas" VARCHAR(8) NOT NULL,
    "group_dinas" VARCHAR(20) NOT NULL,
    "description" VARCHAR(50) NOT NULL,
    "profit_center" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "created_by" VARCHAR(20) NOT NULL,
    "updated_at" TIMESTAMP,
    "updated_by" VARCHAR(20),

    CONSTRAINT "m_cost_center_pkey" PRIMARY KEY ("id_cost_center")
);

-- CreateTable
CREATE TABLE "m_gl_account" (
    "id_gl_account" SERIAL NOT NULL,
    "unique_id" VARCHAR(20) NOT NULL,
    "group" VARCHAR(50) NOT NULL,
    "group_detail" VARCHAR(50) NOT NULL,
    "gl_account" DECIMAL NOT NULL,
    "sap" BOOLEAN NOT NULL,
    "description" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "created_by" VARCHAR(20) NOT NULL,
    "updated_at" TIMESTAMP,
    "updated_by" VARCHAR(20),

    CONSTRAINT "m_gl_account_pkey" PRIMARY KEY ("id_gl_account")
);

-- CreateIndex
CREATE UNIQUE INDEX "m_kurs_unique_id_key" ON "m_kurs"("unique_id");

-- AddForeignKey
ALTER TABLE "t_budget" ADD CONSTRAINT "t_budget_id_gl_account_fkey" FOREIGN KEY ("id_gl_account") REFERENCES "m_gl_account"("id_gl_account") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_budget" ADD CONSTRAINT "t_budget_id_cost_center_fkey" FOREIGN KEY ("id_cost_center") REFERENCES "m_cost_center"("id_cost_center") ON DELETE RESTRICT ON UPDATE CASCADE;
