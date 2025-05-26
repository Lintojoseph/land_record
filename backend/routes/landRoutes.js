// routes/landRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { generatePdf } = require('../services/pdfService');

router.post('/search', async (req, res) => {
  const { searchTerm } = req.body;
  
  try {
    const [rows] = await pool.query(`
      SELECT * FROM land_parcels 
      WHERE parcel_id = ? OR plot_number = ? OR owner_name LIKE ?
    `, [searchTerm, searchTerm, `%${searchTerm}%`]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'No land records found' });
    }
    
    const pdfBuffer = await generatePdf(rows[0]);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=land_record_${rows[0].parcel_id}.pdf`);
    res.send(pdfBuffer);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

module.exports = router;