-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");
