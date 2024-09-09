/*
  Warnings:

  - You are about to drop the column `accessToken` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "refreshToken" TEXT
);
INSERT INTO "new_User" ("firstName", "id", "lastName", "password", "refreshToken", "username") SELECT "firstName", "id", "lastName", "password", "refreshToken", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_refreshToken_key" ON "User"("refreshToken");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
