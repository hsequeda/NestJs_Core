import { MigrationInterface, QueryRunner } from 'typeorm';

export class addCompanyEntity1608366331306 implements MigrationInterface {
  name = 'addCompanyEntity1608366331306';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "company" ("id" varchar2(255) NOT NULL, "created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "code" varchar2(255) NOT NULL, "name" varchar2(255) NOT NULL, "deletedAt" timestamp, "version" number NOT NULL, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "company"`);
  }
}
