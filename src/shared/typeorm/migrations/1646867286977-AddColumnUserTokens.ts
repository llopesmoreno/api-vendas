import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnUserTokens1646867286977 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user_tokens" ADD COLUMN "already_used" boolean`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE user_tokens DROP COLUMN already_used`,
        );
    }
}
