//criar tabela
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) {
        //primary key
        table.increments();
        //campus da tabela
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();  
        //relacionamento
        table.string('ong_id').notNullable(); 
        /**
         * chave estrangeira: 
         * chave estrangeira(qual é a coluna)
         * .referencia(a coluna id)
         * .na tabela(ongs)
         */
        table.foreign('ong_id').references('id').inTable('ongs');
    });
};
//caso de erro: desfazer o que fez
exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};