/**
 * Google Apps Script Backend for Test in Prod
 * 
 * This script handles form submissions from test-in-prod.com:
 * - Validates email addresses
 * - Stores submissions in a Google Sheet
 * - Sends email notifications to support@test-in-prod.com
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://sheets.google.com and create a new spreadsheet
 * 2. Name it "Test in Prod - Leads"
 * 3. Add these headers in Row 1: Timestamp | Form Type | Name | Email | Company | Subject | Message
 * 4. Go to Extensions → Apps Script
 * 5. Delete the default code and paste this entire file
 * 6. Click Deploy → New Deployment
 * 7. Select "Web app" as type
 * 8. Set "Execute as" → Me
 * 9. Set "Who has access" → Anyone
 * 10. Click Deploy and copy the URL
 * 11. Paste the URL into script.js where it says BACKEND_URL
 * 12. IMPORTANT: The first time, you'll need to authorize the app
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    
    // Basic email validation
    if (!data.email || !validateEmail(data.email)) {
      return sendResponse(false, 'Please provide a valid email address');
    }

    // Basic name validation for contact/demo forms
    if (data.form_type !== 'waitlist' && data.form_type !== 'early_access') {
      if (!data.name || data.name.trim().length < 2) {
        return sendResponse(false, 'Please provide your name');
      }
    }

    // Store in Google Sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      new Date().toISOString(),
      data.form_type || 'unknown',
      data.name || '',
      data.email,
      data.company || '',
      data.subject || '',
      data.message || ''
    ]);

    // Send email notification
    var subject = getEmailSubject(data.form_type);
    var htmlBody = buildEmailBody(data);
    
    MailApp.sendEmail({
      to: 'support@test-in-prod.com',
      subject: subject,
      htmlBody: htmlBody,
      replyTo: data.email
    });

    return sendResponse(true, 'Submission received successfully!');

  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return sendResponse(false, 'Something went wrong. Please try again.');
  }
}

function doGet(e) {
  return sendResponse(true, 'Test in Prod Backend is running');
}

function validateEmail(email) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function getEmailSubject(formType) {
  switch (formType) {
    case 'demo_request':
      return '🎯 New Demo Request - Test in Prod';
    case 'contact':
      return '📩 New Contact Message - Test in Prod';
    case 'waitlist':
      return '🚀 New Waitlist Signup - Test in Prod';
    case 'early_access':
      return '⚡ New Early Access Request - Test in Prod';
    default:
      return '📬 New Form Submission - Test in Prod';
  }
}

function buildEmailBody(data) {
  var formTypeLabel = {
    'demo_request': 'Demo Request',
    'contact': 'Contact Form',
    'waitlist': 'Waitlist Signup',
    'early_access': 'Early Access Request'
  };

  var html = '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">';
  html += '<div style="background: linear-gradient(135deg, #6366f1, #a855f7); padding: 24px; border-radius: 12px 12px 0 0;">';
  html += '<h2 style="color: white; margin: 0;">Test in Prod</h2>';
  html += '<p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">' + (formTypeLabel[data.form_type] || 'New Submission') + '</p>';
  html += '</div>';
  html += '<div style="background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-radius: 0 0 12px 12px;">';
  
  html += '<table style="width: 100%; border-collapse: collapse;">';
  
  if (data.name) {
    html += '<tr><td style="padding: 8px 0; color: #64748b; font-weight: 600; width: 120px;">Name</td>';
    html += '<td style="padding: 8px 0; color: #1e293b;">' + escapeHtml(data.name) + '</td></tr>';
  }
  
  html += '<tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email</td>';
  html += '<td style="padding: 8px 0; color: #1e293b;"><a href="mailto:' + escapeHtml(data.email) + '">' + escapeHtml(data.email) + '</a></td></tr>';
  
  if (data.company) {
    html += '<tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Company</td>';
    html += '<td style="padding: 8px 0; color: #1e293b;">' + escapeHtml(data.company) + '</td></tr>';
  }
  
  if (data.subject) {
    html += '<tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Subject</td>';
    html += '<td style="padding: 8px 0; color: #1e293b;">' + escapeHtml(data.subject) + '</td></tr>';
  }
  
  if (data.message) {
    html += '<tr><td style="padding: 8px 0; color: #64748b; font-weight: 600; vertical-align: top;">Message</td>';
    html += '<td style="padding: 8px 0; color: #1e293b;">' + escapeHtml(data.message).replace(/\n/g, '<br>') + '</td></tr>';
  }
  
  html += '</table>';
  html += '<hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;">';
  html += '<p style="color: #94a3b8; font-size: 12px; margin: 0;">Submitted at ' + new Date().toISOString() + '</p>';
  html += '</div></div>';
  
  return html;
}

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function sendResponse(success, message) {
  var output = ContentService.createTextOutput(
    JSON.stringify({ success: success, message: message })
  );
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
