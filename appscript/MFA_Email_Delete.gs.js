function deleteMFAEmails() {
  let mfa_label = GmailApp.getUserLabelByName('MFA/OTP');
  for (let thread of mfa_label.getThreads()) {
    Logger.log(`Found thread: ${thread.getFirstMessageSubject()}`);
    thread.moveToTrash();
  }
}
