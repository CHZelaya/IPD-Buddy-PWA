import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export function generatePdfForSubmission (details: any, summary: any) {
  const doc = new jsPDF()

  doc.setFontSize(18)
  doc.text('KH Contracting - Work Submission Record', 14, 20)


  doc.setFontSize(12)
  doc.text(`Date: ${details.job.date}`, 14, 30)
  doc.text(`Contractor: ${details.contractor.firstName} ${details.contractor.lastName}`, 14, 40)
  doc.text(`Job Address: ${details.job.address}`, 14, 50)

  autoTable(doc, {
    startY: 60,
    head: [['Item', 'Qty', 'Rate', 'Total']],
    body: details.billableItemsSummary.map((item: any) => [
      item.type,
      item.quantity.toString(),
      `$${item.rate.toFixed(2)}`,
      `$${item.total.toFixed(2)}`,
    ]),
  })

  const summaryStartY = (doc as any).lastAutoTable.finalY + 10
  doc.text('Summary:', 14, summaryStartY)
  doc.text(`Total Payout: $${summary.grandTotalAmount.toFixed(2)}`, 14, summaryStartY + 10)

  doc.save(`submission-${details.job.date}.pdf`)
}


export function generatePdfForPersonalRecord (details: any, summary: any) {
  const doc = new jsPDF()

  doc.setFontSize(18)
  doc.text('KH Contracting - Personal Work Record', 14, 20)

  doc.setFontSize(12)
  doc.text(`Date: ${details.job.date}`, 14, 30)
  doc.text(`Contractor: ${details.contractor.firstName} ${details.contractor.lastName}`, 14, 40)
  doc.text(`Job Address: ${details.job.address}`, 14, 50)
  doc.text(`Notes: ${details.job.notes || 'None'}`, 14, 60)

  autoTable(doc, {
    startY: 70,
    head: [['Item', 'Qty', 'Rate', 'Total']],
    body: details.billableItemsSummary.map((item: any) => [
      item.type,
      item.quantity.toString(),
      `$${item.rate.toFixed(2)}`,
      `$${item.total.toFixed(2)}`,
    ]),
  })

  const summaryStartY = (doc as any).lastAutoTable.finalY + 10
  doc.text('Summary:', 14, summaryStartY)
  doc.text(`Total Payout: $${summary.grandTotalAmount.toFixed(2)}`, 14, summaryStartY + 10)
  doc.text(`Tax Deduction: $${summary.taxAmount.toFixed(2)}`, 14, summaryStartY + 20)
  doc.text(`Savings Deduction: $${summary.savingsAmount.toFixed(2)}`, 14, summaryStartY + 30)
  doc.text(`Net Pay: $${(summary.grandTotalAmount - summary.taxAmount - summary.savingsAmount).toFixed(2)}`, 14, summaryStartY + 40)

  doc.save(`personal-record-${details.job.date}.pdf`)
}
