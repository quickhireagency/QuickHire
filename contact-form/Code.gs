const QH_CONTACT={TO:"info@quickhire.agency",ALLOWED_ORIGINS:["https://www.quickhireagency.com","https://quickhireagency.com","http://localhost:8000"]};
function doGet(){return HtmlService.createHtmlOutput("QuickHire contact endpoint is online.");}
function doPost(e){
  let result={ok:false,error:"Unable to send message."};
  try{
    const p=(e&&e.parameter)||{};
    const first=String(p.first_name||"").trim();
    const last=String(p.last_name||"").trim();
    const email=String(p.email||"").trim().toLowerCase();
    const message=String(p.message||"").trim();
    const source=String(p.source||"").trim();
    const honey=String(p.website||"").trim();
    if(honey) throw new Error("Spam check failed.");
    if(!first||!last||!email||!message) throw new Error("All required fields must be completed.");
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Enter a valid email address.");
    const cache=CacheService.getScriptCache();
    const key="contact:"+Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,email)).slice(0,24);
    if(cache.get(key)) throw new Error("Please wait before sending another message.");
    cache.put(key,"1",60);
    const safe=s=>String(s).replace(/[&<>\"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c]));
    const htmlBody=`<h2>QuickHire Website Contact Form</h2><p><strong>Name:</strong> ${safe(first)} ${safe(last)}</p><p><strong>Email:</strong> ${safe(email)}</p><p><strong>Message:</strong><br>${safe(message).replace(/\n/g,"<br>")}</p><p><strong>Source:</strong> ${safe(source)}</p><p><strong>Submitted:</strong> ${new Date().toISOString()}</p>`;
    MailApp.sendEmail({to:QH_CONTACT.TO,subject:"RE: Contact Us",htmlBody:htmlBody,replyTo:email,name:"QuickHire Website"});
    result={ok:true};
  }catch(err){result={ok:false,error:String(err&&err.message?err.message:err)};}
  const payload=JSON.stringify(Object.assign({source:"quickhire-contact"},result)).replace(/</g,"\\u003c");
  return HtmlService.createHtmlOutput(`<script>window.top.postMessage(${payload},"*");</script><p>${result.ok?"Message sent.":"Message failed."}</p>`).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}