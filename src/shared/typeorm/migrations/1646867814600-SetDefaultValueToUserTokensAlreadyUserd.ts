import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetDefaultValueToUserTokensAlreadyUserd1646867814600
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user_tokens" ALTER COLUMN "already_used" SET DEFAULT false`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE user_tokens ALTER COLUMN already_used DROP DEFAULT`,
        );
    }
}
