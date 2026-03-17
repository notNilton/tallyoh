-- CreateTable
CREATE TABLE "import_files" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "account_id" TEXT,
    "card_id" TEXT,
    "sha256" VARCHAR(64) NOT NULL,
    "filename" VARCHAR(255),
    "size_bytes" INTEGER,
    "imported_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "import_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "import_fingerprints" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "import_file_id" TEXT NOT NULL,
    "sha256" VARCHAR(64) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "import_fingerprints_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "import_files_user_id_imported_at_idx" ON "import_files"("user_id", "imported_at");

-- CreateIndex
CREATE UNIQUE INDEX "import_files_user_id_sha256_account_id_card_id_key" ON "import_files"("user_id", "sha256", "account_id", "card_id");

-- CreateIndex
CREATE INDEX "import_fingerprints_import_file_id_idx" ON "import_fingerprints"("import_file_id");

-- CreateIndex
CREATE UNIQUE INDEX "import_fingerprints_user_id_sha256_key" ON "import_fingerprints"("user_id", "sha256");

-- AddForeignKey
ALTER TABLE "import_files" ADD CONSTRAINT "import_files_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "import_files" ADD CONSTRAINT "import_files_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "import_files" ADD CONSTRAINT "import_files_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "cards"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "import_fingerprints" ADD CONSTRAINT "import_fingerprints_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "import_fingerprints" ADD CONSTRAINT "import_fingerprints_import_file_id_fkey" FOREIGN KEY ("import_file_id") REFERENCES "import_files"("id") ON DELETE CASCADE ON UPDATE CASCADE;
