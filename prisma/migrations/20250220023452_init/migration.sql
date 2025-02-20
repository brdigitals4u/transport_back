-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MANAGER', 'DRIVER', 'SHIPPER', 'CUSTOMER');

-- CreateTable
CREATE TABLE "my_forms" (
    "formid" VARCHAR(50) NOT NULL,
    "title" VARCHAR(255),
    "type" VARCHAR(50),
    "module" VARCHAR(50),
    "pkeys" VARCHAR(255),
    "pkeyid" VARCHAR(100),
    "dbtable" VARCHAR(100),
    "model" VARCHAR(100),
    "orderby" VARCHAR(100),
    "extra_props" VARCHAR(255),
    "readonly" SMALLINT,
    "colsize" VARCHAR(10),
    "classes" VARCHAR(255),
    "hint" TEXT,
    "sortno" SMALLINT,
    "active" SMALLINT DEFAULT 1,
    "formview" VARCHAR(100),
    "formfilter" VARCHAR(100),
    "description" TEXT,
    "formgroup" VARCHAR(255),
    "icon" VARCHAR(30),

    CONSTRAINT "my_forms_pkey" PRIMARY KEY ("formid")
);

-- CreateTable
CREATE TABLE "my_forms_columns" (
    "formid" VARCHAR(50) NOT NULL,
    "sectionid" VARCHAR(50),
    "field" VARCHAR(100) NOT NULL,
    "title" VARCHAR,
    "colsize" VARCHAR(30),
    "type" VARCHAR(30),
    "component" VARCHAR(128),
    "required" SMALLINT,
    "sortno" SMALLINT,
    "active" SMALLINT DEFAULT 1,
    "formview" SMALLINT DEFAULT 1,
    "listview" SMALLINT DEFAULT 1,
    "selectqry" TEXT,
    "options" JSONB,
    "defaultvalue" JSONB,
    "addattrs" JSONB,
    "readonly" SMALLINT,
    "hidden" SMALLINT,
    "classes" VARCHAR(255),
    "inline" SMALLINT,
    "placeholder" VARCHAR(255),
    "hint" TEXT,
    "dt_width" VARCHAR(10),
    "dt_sortable" SMALLINT DEFAULT 1,
    "dt_callback" VARCHAR(100),
    "dt_class" VARCHAR(100),
    "dt_rander" TEXT,
    "dt_rowgroup" SMALLINT,
    "dt_filter" SMALLINT DEFAULT 1,
    "dbfield" SMALLINT DEFAULT 1,
    "info" VARCHAR,
    "title_lng" VARCHAR,
    "printview" SMALLINT,
    "printview_spl" SMALLINT DEFAULT 0,

    CONSTRAINT "my_forms_columns_pkey" PRIMARY KEY ("formid","field")
);

-- CreateTable
CREATE TABLE "my_forms_sections" (
    "formid" VARCHAR(50) NOT NULL,
    "sectionid" VARCHAR(50) NOT NULL,
    "title" VARCHAR(255),
    "readonly" SMALLINT,
    "colsize" VARCHAR(30),
    "classes" VARCHAR(255),
    "hint" TEXT,
    "sortno" SMALLINT,
    "active" SMALLINT DEFAULT 1,

    CONSTRAINT "my_forms_sections_pkey" PRIMARY KEY ("formid","sectionid")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "my_forms_columns" ADD CONSTRAINT "my_forms_columns_formid_fkey" FOREIGN KEY ("formid") REFERENCES "my_forms"("formid") ON DELETE NO ACTION ON UPDATE NO ACTION;
