import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeWish11681048746753 implements MigrationInterface {
  name = 'changeWish11681048746753';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "wish" ALTER COLUMN "price" TYPE numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "wish" ALTER COLUMN "raised" TYPE numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "wish" ALTER COLUMN "copied" SET DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "wish" ALTER COLUMN "copied" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "wish" ALTER COLUMN "raised" TYPE numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "wish" ALTER COLUMN "price" TYPE numeric`,
    );
  }
}
