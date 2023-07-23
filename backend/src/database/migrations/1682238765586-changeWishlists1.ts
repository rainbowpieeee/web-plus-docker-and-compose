import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeWishlists11682238765586 implements MigrationInterface {
  name = 'changeWishlists11682238765586';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "wishlist" ALTER COLUMN "description" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "wishlist" ALTER COLUMN "description" SET NOT NULL`,
    );
  }
}
