const SHEET_NAME = 'Sheet1';
const RECIPIENT = 'ivan@obgulf.com';
const SHEET_HEADERS = [
  'Timestamp',
  'Name',
  'Work email',
  'Phone / WhatsApp',
  'Requirement',
  'Locale',
  'Source',
  'Status',
  'Notes',
  'Submission type',
  'LinkedIn',
  'Work link'
];
const ALLOWED_REQUIREMENTS = [
  'agentic-ai',
  'sovereign-cloud-integration',
  'custom-software',
  'ai-readiness',
  'corporate-academy',
  'tech-catch-up',
  'other'
];

function doGet() {
  return jsonResponse({ success: true, status: 'ready' });
}

function doPost(e) {
  let sheet;
  let rowNumber;

  try {
    const payload = JSON.parse((e.postData && e.postData.contents) || '{}');
    const submissionType = payload.submissionType === 'career' ? 'career' : 'enquiry';
    const name = cleanText(payload.name, 120);
    const locale = payload.locale === 'ar' ? 'ar' : 'en';
    const website = cleanText(payload.website, 200);
    const email = cleanText(payload.email, 180);
    const phone = cleanText(payload.phone, 40);
    const requirement = cleanText(payload.requirement, 60);
    const linkedin = cleanText(payload.linkedin, 500);
    const work = cleanText(payload.work, 500);

    if (website) return jsonResponse({ success: true });
    if (name.length < 2) return jsonResponse({ success: false, error: 'Invalid name.' });

    if (submissionType === 'career') {
      if (!isLinkedInUrl(linkedin) || (work && !isWebUrl(work))) {
        return jsonResponse({ success: false, error: 'Invalid career introduction.' });
      }
    } else if ((!email && !phone) || ALLOWED_REQUIREMENTS.indexOf(requirement) === -1) {
      return jsonResponse({ success: false, error: 'Invalid enquiry.' });
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(5000);
    try {
      sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
      if (!sheet) throw new Error('Enquiry sheet not found.');
      ensureHeaders(sheet);
      sheet.appendRow([
        new Date(),
        safeCell(name),
        safeCell(email),
        safeCell(phone),
        safeCell(requirement),
        locale,
        submissionType === 'career' ? 'obgulf.com/careers' : 'obgulf.com',
        'Received',
        '',
        submissionType === 'career' ? 'Career introduction' : 'CEO conversation',
        safeCell(linkedin),
        safeCell(work)
      ]);
      rowNumber = sheet.getLastRow();
    } finally {
      lock.releaseLock();
    }

    const isCareer = submissionType === 'career';
    const subject = isCareer
      ? '[OneBonsai Gulf] Career introduction - ' + name
      : '[OneBonsai Gulf] ' + requirement + ' enquiry - ' + name;
    const body = isCareer
      ? [
          'New OneBonsai Gulf career introduction',
          '',
          'Name: ' + name,
          'LinkedIn: ' + linkedin,
          'Selected work: ' + (work || 'Not provided'),
          'Locale: ' + locale
        ].join('\n')
      : [
          'New OneBonsai Gulf CEO conversation request',
          '',
          'Name: ' + name,
          'Work email: ' + (email || 'Not provided'),
          'Phone / WhatsApp: ' + (phone || 'Not provided'),
          'Requirement: ' + requirement,
          'Locale: ' + locale
        ].join('\n');
    const message = {
      to: RECIPIENT,
      subject: subject,
      body: body,
      name: 'OneBonsai Gulf Website'
    };
    if (!isCareer && email) message.replyTo = email;
    MailApp.sendEmail(message);
    sheet.getRange(rowNumber, 8).setValue('Emailed');

    return jsonResponse({ success: true });
  } catch (error) {
    if (sheet && rowNumber) sheet.getRange(rowNumber, 8).setValue('Email failed');
    console.error(error);
    return jsonResponse({ success: false, error: 'Delivery failed.' });
  }
}

function ensureHeaders(sheet) {
  sheet.getRange(1, 1, 1, SHEET_HEADERS.length).setValues([SHEET_HEADERS]);
}

function cleanText(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function isLinkedInUrl(value) {
  return /^https?:\/\/([a-z0-9-]+\.)*linkedin\.com\//i.test(value);
}

function isWebUrl(value) {
  return /^https?:\/\/[^\s]+$/i.test(value);
}

function safeCell(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function jsonResponse(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
