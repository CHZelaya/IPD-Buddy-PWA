import jsPDF, { jsPDF as jsPDFType } from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { JobSummary } from '@/types';

export function generatePdfForSubmission(details: any, summary: any) {
  const doc = new jsPDF();
  const gst = summary.grandTotalAmount * 0.05;
  const totalWithGst = summary.grandTotalAmount + gst;

  doc.setFontSize(18);
  doc.text('KH Contracting - Work Submission Record', 14, 20);

  doc.setFontSize(12);
  doc.text(`Date: ${details.job.date}`, 14, 30);
  doc.text(`Contractor: ${details.contractor.firstName} ${details.contractor.lastName}`, 14, 40);
  doc.text(`Job Address: ${details.job.address}`, 14, 50);

  autoTable(doc, {
    startY: 60,
    head: [['Item', 'Qty', 'Rate', 'Total']],
    body: details.billableItemsSummary.map((item: any) => {
      return [
        item.type,
        item.quantity.toString(),
        `$${Number(item.rate).toFixed(2)}`,
        `$${Number(item.total).toFixed(2)}`,
      ];
    }),
  });

  const summaryStartY = (doc as any).lastAutoTable.finalY + 10;

  // const gst = summary.grandTotalAmount * 0.05
  // const totalWithGst = summary.grandTotalAmount + gst

  doc.text('Summary:', 14, summaryStartY);
  doc.text(`Subtotal: $${summary.grandTotalAmount.toFixed(2)}`, 14, summaryStartY + 10);
  doc.text(`GST (5%): $${gst.toFixed(2)}`, 14, summaryStartY + 20);
  doc.text(`Total (including GST): $${totalWithGst.toFixed(2)}`, 14, summaryStartY + 30);

  const notes = details.job.notes?.trim() || 'None';
  const wrappedNotes = doc.splitTextToSize(`Notes: ${notes}`, 180);
  doc.text(wrappedNotes, 14, summaryStartY + 40);

  doc.save(`submission-${formatFilename(details.job.address)}-${details.job.date}.pdf`);
}

export function generatePdfForPersonalRecord(details: any, summary: any) {
  const doc = new jsPDF();
  const gst = summary.grandTotalAmount * 0.05;
  const totalWithGst = summary.grandTotalAmount + gst;

  doc.setFontSize(18);
  doc.text('KH Contracting - Personal Work Record', 14, 20);

  doc.setFontSize(12);
  doc.text(`Date: ${details.job.date}`, 14, 30);
  doc.text(`Contractor: ${details.contractor.firstName} ${details.contractor.lastName}`, 14, 40);
  doc.text(`Job Address: ${details.job.address}`, 14, 50);

  autoTable(doc, {
    startY: 70,
    head: [['Item', 'Qty', 'Rate', 'Total']],
    body: details.billableItemsSummary.map((item: any) => {
      return [
        item.type,
        item.quantity.toString(),
        `$${Number(item.rate).toFixed(2)}`,
        `$${Number(item.total).toFixed(2)}`,
      ];
    }),
  });

  const summaryStartY = (doc as any).lastAutoTable.finalY + 10;
  doc.text('Summary:', 14, summaryStartY);
  doc.text(`Subtotal: $${summary.grandTotalAmount.toFixed(2)}`, 14, summaryStartY + 10);
  doc.text(`GST (5%): $${gst.toFixed(2)}`, 14, summaryStartY + 20);
  doc.text(`Total (including GST): $${totalWithGst.toFixed(2)}`, 14, summaryStartY + 30);
  doc.text(`Tax Deduction: $${summary.taxAmount.toFixed(2)}`, 14, summaryStartY + 40);
  doc.text(`Savings Deduction: $${summary.savingsAmount.toFixed(2)}`, 14, summaryStartY + 50);
  doc.text(
    `Net Pay: $${(summary.grandTotalAmount - summary.taxAmount - summary.savingsAmount).toFixed(2)}`,
    14,
    summaryStartY + 60
  );

  const notes = details.job.notes?.trim() || 'None';
  const wrappedNotes = doc.splitTextToSize(`Notes: ${notes}`, 180);
  doc.text(wrappedNotes, 14, summaryStartY + 70);

  doc.save(`personal-record-${formatFilename(details.job.address)}-${details.job.date}.pdf`);
}

/* * Generates a PDF summary for a pay period, including job details and totals.
 * @param {Object} params - The parameters for the PDF generation.
 */

export function generatePdfForPayPeriod({
  contractor,
  jobs,
  totals,
  payPeriod,
}: {
  contractor: { firstName: string; lastName: string };
  jobs: JobSummary[];
  totals: { total: number };
  payPeriod: { start: string; end: string };
}) {
  const doc = new jsPDF();
  const gst = totals.total * 0.05;
  const totalWithGst = totals.total + gst;

  const typedDoc = doc as jsPDFType & {
    lastAutoTable: { finalY: number };
  };

  doc.setFontSize(16);
  doc.text('KH Contracting - Pay Period Summary', 14, 20);

  doc.setFontSize(12);
  doc.text(`Contractor: ${contractor.firstName} ${contractor.lastName}`, 14, 30);

  //Formating the pay period dates
  const formatDate = (dateStr: string) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString('en-CA', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      : null;

  const payPeriodText =
    payPeriod.start && payPeriod.end
      ? `Pay Period: ${formatDate(payPeriod.start)} to ${formatDate(payPeriod.end)}`
      : 'Pay Period: Full Year Report';

  doc.text(payPeriodText, 14, 38);
  doc.text(`Jobs Completed: ${jobs.length}`, 14, 46);

  // Table of jobs
  const jobRows = jobs.map((job) => [
    job.date,
    job.address,
    `$${Number(job.grandTotalAmount ?? 0).toFixed(2)}`,
    // `$${Number(job.taxAmount ?? 0).toFixed(2)}`,
    // `$${Number(job.savingsAmount ?? 0).toFixed(2)}`,
  ]);

  autoTable(doc, {
    startY: 54,
    head: [['Date', 'Address', 'Total']],
    body: jobRows,
  });

  const summaryStartY = typedDoc.lastAutoTable.finalY + 10;

  doc.setFontSize(12);
  doc.text('Summary', 14, summaryStartY);
  doc.text(`Subtotal: $${totals.total.toFixed(2)}`, 14, summaryStartY + 10);
  doc.text(`GST (5%): $${gst.toFixed(2)}`, 14, summaryStartY + 20);
  doc.text(`Total with GST: $${totalWithGst.toFixed(2)}`, 14, summaryStartY + 30);
  // doc.text(`Total Tax Deducted: $${totals.tax.toFixed(2)}`, 14, summaryStartY + 40);
  // doc.text(`Total Saved: $${totals.savings.toFixed(2)}`, 14, summaryStartY + 50);

  //Helper function to format date for filename
  const formatDateForFilename = (date: string | null) =>
    date ? new Date(date).toISOString().split('T')[0] : 'full-year';

  const fileName = `Pay_Period_Summary_${contractor.lastName}_${formatDateForFilename(payPeriod.start)}_to_${formatDateForFilename(payPeriod.end)}.pdf`;

  doc.save(fileName);
}

//Helper function to format file names
function formatFilename(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // replace spaces/symbols with hyphens
    .replace(/^-+|-+$/g, '') // trim leading/trailing hyphens
    .slice(0, 30); // prevent monster-long filenames
}
