import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeWish21681064987122 implements MigrationInterface {
  name = 'changeWish21681064987122';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "wish" ALTER COLUMN "price" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "wish" ALTER COLUMN "raised" TYPE numeric(10,2)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "wish" ALTER COLUMN "raised" TYPE numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "wish" ALTER COLUMN "price" TYPE numeric`,
    );
  }
}
