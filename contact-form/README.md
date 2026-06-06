# QuickHire Contact Form Deployment

1. Create a new standalone Google Apps Script project.
2. Replace `Code.gs` with the supplied file and add `appsscript.json` through Project Settings → Show manifest file.
3. Run `doGet` once and authorize the send-mail scope.
4. Deploy → New deployment → Web app. Execute as **Me**. Access: **Anyone**.
5. Copy the `/exec` URL into `/config/config.js` as `CONTACT_ENDPOINT`.
6. Submit a live test from both `/` and `/contact`.

This is separate from the existing Job Board Apps Script and does not modify that backend.
