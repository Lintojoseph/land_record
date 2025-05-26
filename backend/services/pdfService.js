// // services/pdfService.js
// const pdf = require('html-pdf');

// const generatePdfTemplate = (landData) => `
//   <html>
//     <!-- Your PDF template HTML here -->
//   </html>
// `;

// const generatePdf = (landData) => {
//   return new Promise((resolve, reject) => {
//     const html = generatePdfTemplate(landData);
//     const options = { format: 'Letter' };
    
//     pdf.create(html, options).toBuffer((err, buffer) => {
//       if (err) return reject(err);
//       resolve(buffer);
//     });
//   });
// };

// module.exports = { generatePdf };
// services/pdfService.js
const pdf = require('html-pdf');

const generatePdfTemplate = (landData) => {
  // Make sure to properly escape all data fields
  const escapeHtml = (unsafe) => {
    return unsafe 
      ? unsafe.toString()
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;")
      : '';
  };

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Land Record</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
      .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #eee; padding-bottom: 20px; }
      h1 { color: #2c3e50; margin: 0; }
      .subtitle { color: #7f8c8d; margin: 5px 0 0; }
      .section { margin-bottom: 25px; }
      .section-title { background-color: #f8f9fa; padding: 8px 12px; font-weight: bold; border-left: 4px solid #2c3e50; }
      .data-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
      .data-table th, .data-table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
      .data-table th { background-color: #f2f2f2; }
      .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #eee; font-size: 12px; text-align: center; color: #7f8c8d; }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>Land Record Certificate</h1>
      <p class="subtitle">Official Document</p>
    </div>

    <div class="section">
      <div class="section-title">Property Information</div>
      <table class="data-table">
        <tr>
          <th>Parcel ID</th>
          <td>${escapeHtml(landData.parcel_id)}</td>
        </tr>
        <tr>
          <th>Plot Number</th>
          <td>${escapeHtml(landData.plot_number)}</td>
        </tr>
        <tr>
          <th>Location</th>
          <td>${escapeHtml(landData.location)}</td>
        </tr>
        <tr>
          <th>Area (sq ft)</th>
          <td>${escapeHtml(landData.area)}</td>
        </tr>
        <tr>
          <th>Zoning Type</th>
          <td>${escapeHtml(landData.zoning)}</td>
        </tr>
      </table>
    </div>

    <div class="section">
      <div class="section-title">Ownership Details</div>
      <table class="data-table">
        <tr>
          <th>Owner Name</th>
          <td>${escapeHtml(landData.owner_name)}</td>
        </tr>
        <tr>
          <th>Contact Number</th>
          <td>${escapeHtml(landData.contact_number)}</td>
        </tr>
        <tr>
          <th>Purchase Date</th>
          <td>${escapeHtml(landData.purchase_date)}</td>
        </tr>
      </table>
    </div>

    <div class="footer">
      <p>This document was generated electronically by Landeed System</p>
      <p>Generated on: ${new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}</p>
    </div>
  </body>
  </html>
  `;
};

const generatePdf = async (landData) => {
  return new Promise((resolve, reject) => {
    console.log('Generating PDF with data:', landData); // Debug log
    
    const html = generatePdfTemplate(landData);
    const options = { 
      format: 'A4',
      border: {
        top: '20mm',
        right: '10mm',
        bottom: '20mm',
        left: '10mm'
      },
      timeout: 30000 // 30 seconds timeout
    };

    pdf.create(html, options).toBuffer((err, buffer) => {
      if (err) {
        console.error('PDF generation error:', err);
        return reject(err);
      }
      resolve(buffer);
    });
  });
};

module.exports = { generatePdf };