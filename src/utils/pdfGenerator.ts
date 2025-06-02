import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { BILLABLE_RATES } from '@/utils/BillableRates'


export function generatePdfForSubmission (details: any, summary: any) {
  const doc = new jsPDF()
  const gst = summary.grandTotalAmount * 0.05
  const totalWithGst = summary.grandTotalAmount + gst

  doc.setFontSize(18)
  doc.text('KH Contracting - Work Submission Record', 14, 20)

  doc.setFontSize(12)
  doc.text(`Date: ${details.job.date}`, 14, 30)
  doc.text(`Contractor: ${details.contractor.firstName} ${details.contractor.lastName}`, 14, 40)
  doc.text(`Job Address: ${details.job.address}`, 14, 50)


  autoTable(doc, {
    startY: 60,
    head: [['Item', 'Qty', 'Rate', 'Total']],
    body: details.billableItemsSummary.map((item: any) => {
      const rateInfo = BILLABLE_RATES[item.type] || { rate: 0, description: 'Unknown Item' }
      const rate = rateInfo.rate
      const total = rate * item.quantity
      return [
        item.type,
        item.quantity.toString(),
        `$${rate.toFixed(2)}`,
        `$${total.toFixed(2)}`,
      ]
    }),
  })

  const summaryStartY = (doc as any).lastAutoTable.finalY + 10

  // const gst = summary.grandTotalAmount * 0.05
  // const totalWithGst = summary.grandTotalAmount + gst

  doc.text('Summary:', 14, summaryStartY)
  doc.text(`Subtotal: $${summary.grandTotalAmount.toFixed(2)}`, 14, summaryStartY + 10)
  doc.text(`GST (5%): $${gst.toFixed(2)}`, 14, summaryStartY + 20)
  doc.text(`Total (including GST): $${totalWithGst.toFixed(2)}`, 14, summaryStartY + 30)

  const notes = details.job.notes?.trim() || 'None';
  const wrappedNotes = doc.splitTextToSize(`Notes: ${notes}`, 180);
  doc.text(wrappedNotes, 14, summaryStartY + 40);

  doc.save(`submission-${details.job.date}.pdf`)
}

export function generatePdfForPersonalRecord (details: any, summary: any) {
  const doc = new jsPDF()
  const gst = summary.grandTotalAmount * 0.05
  const totalWithGst = summary.grandTotalAmount + gst

  doc.setFontSize(18)
  doc.text('KH Contracting - Personal Work Record', 14, 20)

  doc.setFontSize(12)
  doc.text(`Date: ${details.job.date}`, 14, 30)
  doc.text(`Contractor: ${details.contractor.firstName} ${details.contractor.lastName}`, 14, 40)
  doc.text(`Job Address: ${details.job.address}`, 14, 50)


  autoTable(doc, {
    startY: 70,
    head: [['Item', 'Qty', 'Rate', 'Total']],
    body: details.billableItemsSummary.map((item: any) => {
      const rateInfo = BILLABLE_RATES[item.type] || { rate: 0, description: 'Unknown Item' }
      const rate = rateInfo.rate
      const total = rate * item.quantity
      return [
        item.type,
        item.quantity.toString(),
        `$${rate.toFixed(2)}`,
        `$${total.toFixed(2)}`,
      ]
    }),
  })


  const summaryStartY = (doc as any).lastAutoTable.finalY + 10
  doc.text('Summary:', 14, summaryStartY)
  doc.text(`Subtotal: $${summary.grandTotalAmount.toFixed(2)}`, 14, summaryStartY + 10)
  doc.text(`GST (5%): $${gst.toFixed(2)}`, 14, summaryStartY + 20)
  doc.text(`Total (including GST): $${totalWithGst.toFixed(2)}`, 14, summaryStartY + 30)
  doc.text(`Tax Deduction: $${summary.taxAmount.toFixed(2)}`, 14, summaryStartY + 40)
  doc.text(`Savings Deduction: $${summary.savingsAmount.toFixed(2)}`, 14, summaryStartY + 50)
  doc.text(`Net Pay: $${(summary.grandTotalAmount - summary.taxAmount - summary.savingsAmount).toFixed(2)}`, 14, summaryStartY + 60)

  const notes = details.job.notes?.trim() || 'None';
  const wrappedNotes = doc.splitTextToSize(`Notes: ${notes}`, 180);
  doc.text(wrappedNotes, 14, summaryStartY + 70);

  doc.save(`personal-record-${details.job.date}.pdf`)
}
