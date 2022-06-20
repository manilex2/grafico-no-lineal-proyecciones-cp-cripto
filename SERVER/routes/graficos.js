const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/grafico/:indice', async (req, res) => {
    const { indice } = req.params;
    var sql = `SELECT PCNL.id, PCNL.cripto, PCNL.fecha, PCNL.id_precio, PCNL.forecast, PCNL.pesimista, PCNL.optimista, PCNL.id_grupo, PA.precio AS precio FROM ${process.env.TABLE_CRIPTO_PROY_CP_NOLINEAL} AS PCNL LEFT JOIN ${process.env.TABLE_CRIPTO_PRECIO_ACTUAL} AS PA ON PCNL.id_precio = PA.id WHERE cripto = ? ORDER BY fecha ASC`;
    const datos = await pool.query(sql, [indice]);
    const datosExtraidos = JSON.stringify(datos);
    res.send(datosExtraidos);
});

module.exports = router; 