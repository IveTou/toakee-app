import JsPDF from 'jspdf';
import { sortBy } from 'lodash';

const FontSize = {
  EVENT: 24,
  HEADER: 18,
  NAME: 12,
  GUEST_LIST: 8,
};

export const generateGuestListPdf = (event = {}, invitations = []) => {
  const list = sortBy(invitations, ['normalizedName']);

  const doc = new JsPDF('p', 'pt', 'a4');

  doc.setFontSize(FontSize.EVENT);
  doc.text(`Lista ${event.title || ''}`, 18, 56);
  doc.line(0, 62, 595, 62);

  let currentLine = 62;
  let newPage = true;
  list.forEach((invitation, i) => {
    if (currentLine >= 824) {
      doc.addPage();
      currentLine = 32;
      newPage = true;
    }

    if (newPage || invitation.normalizedName[0] !== list[i - 1].normalizedName[0]) {
      newPage = false;
      currentLine += 30;
      doc.setFontSize(FontSize.HEADER);
      doc.text(invitation.normalizedName[0], 18, currentLine + 3);
    }

    doc.setFontSize(FontSize.NAME);
    doc.text(invitation.name.toUpperCase(), 54, currentLine);

    doc.setFontSize(FontSize.GUEST_LIST);
    doc.text(
      `(${invitation.guestList.name})`,
      60 + (doc.getStringUnitWidth(invitation.name.toUpperCase()) * 12),
      currentLine,
    );
    doc.line(54, currentLine + 2, 565, currentLine + 2);
    currentLine += 26;
  });
  doc.save('a4.pdf');
};
