-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "access" TEXT NOT NULL DEFAULT E'A',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "faculty" TEXT NOT NULL,
    "section" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentPresentRelation" (
    "studentPresentId" SERIAL NOT NULL,
    "studentId" TEXT NOT NULL,
    "presentPresentId" INTEGER NOT NULL,

    CONSTRAINT "StudentPresentRelation_pkey" PRIMARY KEY ("studentPresentId")
);

-- CreateTable
CREATE TABLE "StudentAbsentRelation" (
    "studentAbsentId" SERIAL NOT NULL,
    "studentId" TEXT NOT NULL,
    "absentAbsentId" INTEGER NOT NULL,

    CONSTRAINT "StudentAbsentRelation_pkey" PRIMARY KEY ("studentAbsentId")
);

-- CreateTable
CREATE TABLE "Present" (
    "presentId" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Present_pkey" PRIMARY KEY ("presentId")
);

-- CreateTable
CREATE TABLE "Absent" (
    "absentId" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Absent_pkey" PRIMARY KEY ("absentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Student_id_key" ON "Student"("id");

-- CreateIndex
CREATE UNIQUE INDEX "StudentPresentRelation_studentPresentId_key" ON "StudentPresentRelation"("studentPresentId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentAbsentRelation_studentAbsentId_key" ON "StudentAbsentRelation"("studentAbsentId");

-- CreateIndex
CREATE UNIQUE INDEX "Present_presentId_key" ON "Present"("presentId");

-- CreateIndex
CREATE UNIQUE INDEX "Absent_absentId_key" ON "Absent"("absentId");

-- AddForeignKey
ALTER TABLE "StudentPresentRelation" ADD CONSTRAINT "StudentPresentRelation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentPresentRelation" ADD CONSTRAINT "StudentPresentRelation_presentPresentId_fkey" FOREIGN KEY ("presentPresentId") REFERENCES "Present"("presentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAbsentRelation" ADD CONSTRAINT "StudentAbsentRelation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAbsentRelation" ADD CONSTRAINT "StudentAbsentRelation_absentAbsentId_fkey" FOREIGN KEY ("absentAbsentId") REFERENCES "Absent"("absentId") ON DELETE RESTRICT ON UPDATE CASCADE;
