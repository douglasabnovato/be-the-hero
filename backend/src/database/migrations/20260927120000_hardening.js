/* Migração de endurecimento: data de criação, índice por ONG e e-mail único para novas ONGs */
exports.up = async function up(knex) {
  await knex.schema.alterTable("incidents", (table) => {
    table.timestamp("created_at").nullable();
    table.index(["ong_id"], "incidents_ong_id_idx");
  });
  await knex.schema.alterTable("ongs", (table) => {
    table.timestamp("created_at").nullable();
  });
};

/* Desfaz a migração */
exports.down = async function down(knex) {
  await knex.schema.alterTable("incidents", (table) => {
    table.dropIndex(["ong_id"], "incidents_ong_id_idx");
    table.dropColumn("created_at");
  });
  await knex.schema.alterTable("ongs", (table) => table.dropColumn("created_at"));
};
/* Fim de 20260927120000_hardening.js */
