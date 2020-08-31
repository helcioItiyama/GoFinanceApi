"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateIncome1598452467175 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'incomes',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'type',
        type: 'varchar'
      }, {
        name: 'value',
        type: 'decimal',
        scale: 2
      }, {
        name: 'user_id',
        type: 'uuid',
        isNullable: true
      }, {
        name: 'date',
        type: 'timestamp with time zone'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }],
      foreignKeys: [{
        name: 'userIncome',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['user_id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('incomes');
  }

}

exports.default = CreateIncome1598452467175;