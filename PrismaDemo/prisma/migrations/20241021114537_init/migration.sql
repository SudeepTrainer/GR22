-- CreateTable
CREATE TABLE "_userrole" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_userrole_AB_unique" ON "_userrole"("A", "B");

-- CreateIndex
CREATE INDEX "_userrole_B_index" ON "_userrole"("B");

-- AddForeignKey
ALTER TABLE "_userrole" ADD CONSTRAINT "_userrole_A_fkey" FOREIGN KEY ("A") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userrole" ADD CONSTRAINT "_userrole_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
