const categories = {
  "Roleplay Offences": ["FailRP","Low Quality Roleplay","Powergaming","Metagaming","FearRP / No Value of Life (NVL)","Random Deathmatch (RDM)","New Life Rule (NLR) Violation","Combat Logging","Combat Exploiting","Breaking Character (IC/OOC Mixing)","Unrealistic Character Behaviour","Unrealistic Combat Behaviour","Forced RP","Story Sabotage","Event Disruption","Character Farming","Intentional Character Suicide to Avoid RP"],
  "Community Offences": ["Toxic Behaviour","Harassment","Bullying","OOC Drama","Personal Attacks","Hate Speech","IRL Prejudice","Staff Harassment","False Reports","Report Abuse","Impersonating Staff","Ban Evasion","Alternate Account Abuse","Advertising Other Servers","Malicious Rumours","Stream Sniping","Doxxing"],
  "Exploiting & Cheating": ["Exploiting Bugs","Duplication Exploits","Economy Exploits","Terrain Exploits","Wall Glitching","Speed Hacks","ESP / Wall Hacks","Aim Assistance","Third Party Cheats","Script Injection","Packet Manipulation","Client Modification","Automation / Macros","Item Injection","Unauthorized Console Commands"],
  "Economy Offences": ["Scamming Outside RP Rules","Exploitative Trading","Duping Currency","Alt Character Money Transfers","Laundering Through Alternate Characters","Market Manipulation","Abuse of Donations","Begging Staff for Items"],
  "Character Offences": ["Character Copying","Lore Breaking Character","Unrealistic Naming","Troll Characters","Meme Characters","Character Reset Abuse","Faction Hopping to Avoid Consequences","Character Parking to Avoid RP"],
  "Faction Offences": ["Insiding","Faction Betrayal Without RP","Abuse of Leadership","Corruption Without RP","Recruitment Exploitation","Meta Recruitment","Safezone Abuse","Spawn Camping","Siege Rule Violations","Provoking Lore Factions Without Reason","Abuse of Faction Resources"],
  "PvP Offences": ["Random PvP","Camping Respawn Locations","Third Partying Without RP","Logging During PvP","Safe Zone Fighting","Exploiting Combat Mechanics","Gear Swapping During Combat","Combat Healing Exploits"],
  "Staff Interaction Offences": ["Ignoring Staff Instructions","Refusing Staff Teleports","Lying to Staff","Withholding Evidence","Deleting Evidence During Investigation","Interfering With Investigations","Abuse of Support Tickets","Threatening Staff","Staff Disrespect"],
  "Miscellaneous": ["Inappropriate Character Names","Inappropriate Guild Names","Offensive Symbols","Offensive Character Appearance","Intentional Server Disruption","Excessive Mic Spam","Soundboard Abuse","Voice Changer Abuse for Trolling","Spam","Circumventing Punishments","Encouraging Others to Break Rules"],
  "Severe Offences": ["Cheating","Distribution of Cheats","Malicious Exploiting","Staff Impersonation","Selling In-Game Items for Real Money (RMT)","Account Sharing to Evade Punishments","Malicious Threats Toward Community Members"]
};

const tierGroups = {
  "non-staff": ["Low Quality Roleplay"],
  "standard": ["FailRP","Powergaming","Metagaming","FearRP / No Value of Life (NVL)","Random Deathmatch (RDM)","New Life Rule (NLR) Violation","Breaking Character (IC/OOC Mixing)","Unrealistic Character Behaviour","Unrealistic Combat Behaviour","Toxic Behaviour","Harassment","Bullying","Hate Speech","Report Abuse","Advertising Other Servers","Malicious Rumours","Stream Sniping","Exploiting Bugs","Terrain Exploits","Wall Glitching","Automation / Macros","Scamming Outside RP Rules","Begging Staff for Items","Faction Hopping to Avoid Consequences","Character Parking to Avoid RP","Insiding","Faction Betrayal Without RP","Abuse of Leadership","Corruption Without RP","Recruitment Exploitation","Meta Recruitment","Safezone Abuse","Spawn Camping","Siege Rule Violations","Provoking Lore Factions Without Reason","Abuse of Faction Resources","Random PvP","Third Partying Without RP","Safe Zone Fighting","Exploiting Combat Mechanics","Gear Swapping During Combat","Combat Healing Exploits","Refusing Staff Teleports","Lying to Staff","Interfering With Investigations","Abuse of Support Tickets","Staff Disrespect","Inappropriate Character Names","Inappropriate Guild Names","Offensive Symbols","Offensive Character Appearance","Intentional Server Disruption","Excessive Mic Spam","Soundboard Abuse","Voice Changer Abuse for Trolling","Spam","Circumventing Punishments","Encouraging Others to Break Rules"],
  "instant-kick": ["Combat Logging","Combat Exploiting","Forced RP","Story Sabotage","Event Disruption","Character Farming","Intentional Character Suicide to Avoid RP","OOC Drama","Personal Attacks","IRL Prejudice","Staff Harassment","False Reports","Impersonating Staff","Ban Evasion","Alternate Account Abuse","Duplication Exploits","Economy Exploits","Exploitative Trading","Duping Currency","Alt Character Money Transfers","Laundering Through Alternate Characters","Market Manipulation","Abuse of Donations","Camping Respawn Locations","Logging During PvP","Ignoring Staff Instructions","Threatening Staff"],
  "instant-ban": ["Speed Hacks","ESP / Wall Hacks","Aim Assistance","Third Party Cheats","Script Injection","Packet Manipulation","Client Modification","Doxxing","Item Injection","Unauthorized Console Commands","Cheating","Distribution of Cheats","Malicious Exploiting","Staff Impersonation","Selling In-Game Items for Real Money (RMT)","Account Sharing to Evade Punishments","Malicious Threats Toward Community Members"],
  "character-delete": ["Character Copying","Lore Breaking Character","Unrealistic Naming","Troll Characters","Meme Characters","Character Reset Abuse"],
  "special": ["Withholding Evidence","Deleting Evidence During Investigation"]
};

const tierMeta = {
  "non-staff": { label:"Non-Staff Issue", punishment:"No standard staff punishment", notes:"Ordinarily handled through roleplay, player choice, feedback, or coaching unless another enforceable offence is also committed." },
  "standard": { label:"Standard Escalation", punishment:"Warn → Kick → Temporary Ban → Permanent Ban", notes:"Progression depends on severity, intent, prior history, cooperation, and impact. Staff may skip stages where justified." },
  "instant-kick": { label:"Immediate Escalation", punishment:"Instant Kick → Temporary Ban → Permanent Ban", notes:"An immediate removal from the active situation is appropriate before further punishment is considered." },
  "instant-ban": { label:"Instant Ban", punishment:"Immediate Temporary Ban or Permanent Ban", notes:"Serious offences may justify immediate removal without a prior warning or kick." },
  "character-delete": { label:"Character Deletion", punishment:"Character Deletion, with additional punishment where appropriate", notes:"Used where the character itself is invalid, abusive, copied, exploitative, or created in breach of character standards." },
  "special": { label:"Special Case", punishment:"With 100% proof: Temporary Ban → Permanent Ban", notes:"Requires conclusive evidence and senior review." }
};

const tierColours = { "non-staff":"var(--tier-non-staff)", "standard":"var(--tier-standard)", "instant-kick":"var(--tier-instant-kick)", "instant-ban":"var(--tier-instant-ban)", "character-delete":"var(--tier-character-delete)", "special":"var(--tier-special)" };

const priority = ["instant-ban","special","character-delete","instant-kick","standard","non-staff"];
const tierLookup = {};
priority.slice().reverse().forEach(tier => tierGroups[tier].forEach(name => tierLookup[name] = tier));
priority.forEach(tier => tierGroups[tier].forEach(name => tierLookup[name] = tier));

const offences = [];
const seen = new Set();
Object.entries(categories).forEach(([category,names]) => {
  names.forEach(name => {
    if (seen.has(name)) return;
    seen.add(name);
    const tier = tierLookup[name] || "standard";
    const meta = tierMeta[tier];
    let notes = meta.notes;
    if (name === "Doxxing") notes = "Immediate permanent ban. Preserve evidence and escalate to senior staff immediately.";
    if (name === "Ban Evasion") notes = "Treat as an immediate ban matter. Consider the original punishment, intent, linked accounts, and any additional misconduct.";
    if (name === "Withholding Evidence" || name === "Deleting Evidence During Investigation") notes = "Requires 100% proof before enforcement. Temporary Ban → Permanent Ban.";
    if (name === "Low Quality Roleplay") notes = "Ordinarily a non-staff issue. Staff intervention should occur only where separate enforceable behaviour is present.";
    offences.push({ offence:name, category, tier, tierLabel:meta.label, punishment:meta.punishment, notes });
  });
});

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const tierFilter = document.getElementById("tierFilter");
const clearFilters = document.getElementById("clearFilters");
const expandAll = document.getElementById("expandAll");
const offenceList = document.getElementById("offenceList");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
let allExpanded = false;

function escapeHtml(value){ return String(value).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"); }
function populateFilters(){
  [...new Set(offences.map(x=>x.category))].sort().forEach(category=>{ const o=document.createElement("option"); o.value=category; o.textContent=category; categoryFilter.appendChild(o); });
  [...new Map(offences.map(x=>[x.tier,x.tierLabel])).entries()].forEach(([tier,label])=>{ const o=document.createElement("option"); o.value=tier; o.textContent=label; tierFilter.appendChild(o); });
}
function getFiltered(){
  const q=searchInput.value.trim().toLowerCase(), c=categoryFilter.value, t=tierFilter.value;
  return offences.filter(item => (!q || item.offence.toLowerCase().includes(q) || item.category.toLowerCase().includes(q) || item.punishment.toLowerCase().includes(q) || item.notes.toLowerCase().includes(q)) && (c==="all" || item.category===c) && (t==="all" || item.tier===t));
}
function render(){
  const filtered=getFiltered(); offenceList.innerHTML=""; resultCount.textContent=`${filtered.length} offence${filtered.length===1?"":"s"} shown`; emptyState.hidden=filtered.length!==0;
  filtered.forEach(item=>{
    const card=document.createElement("article"); card.className=`offence-card${allExpanded?" open":""}`; card.style.setProperty("--tier-color",tierColours[item.tier]);
    card.innerHTML=`<button class="offence-summary" type="button" aria-expanded="${allExpanded}"><div><h3 class="offence-title">${escapeHtml(item.offence)}</h3><div class="offence-category">${escapeHtml(item.category)}</div></div><div class="offence-summary-right"><span class="punishment-badge">${escapeHtml(item.tierLabel)}</span><span class="chevron">▼</span></div></button><div class="offence-details"><div class="detail-grid"><div class="detail-box"><h4>Recommended Punishment</h4><p>${escapeHtml(item.punishment)}</p></div><div class="detail-box"><h4>Staff Notes</h4><p>${escapeHtml(item.notes)}</p></div></div></div>`;
    const summary=card.querySelector(".offence-summary"); summary.addEventListener("click",()=>{ const open=card.classList.toggle("open"); summary.setAttribute("aria-expanded",String(open)); }); offenceList.appendChild(card);
  });
}
searchInput.addEventListener("input",render); categoryFilter.addEventListener("change",render); tierFilter.addEventListener("change",render);
clearFilters.addEventListener("click",()=>{ searchInput.value=""; categoryFilter.value="all"; tierFilter.value="all"; render(); });

/* ===========================
   SUPABASE STAFF LOGIN
=========================== */

const staffLoginBtn =
  document.getElementById("staffLoginBtn");

const staffLogoutBtn =
  document.getElementById("staffLogoutBtn");

const staffStatus =
  document.getElementById("staffStatus");

const staffEditorControls =
  document.getElementById("staffEditorControls");

let staffRole = null;

async function refreshStaffSession() {
  const { data: { user }, error } =
    await supabaseClient.auth.getUser();

  staffRole = null;

  if (!error && user) {
    const { data: staff, error: roleError } =
      await supabaseClient
        .from("staff_members")
        .select("role")
        .eq("user_id", user.id)
        .maybeSingle();

    if (!roleError && staff) {
      staffRole = staff.role;
    }
  }

  const isEditor =
    staffRole === "editor" || staffRole === "admin";

  staffLoginBtn.hidden = Boolean(user);
  staffLogoutBtn.hidden = !user;
  staffEditorControls.hidden = !isEditor;

  staffStatus.textContent = !user
    ? "Viewing as guest"
    : isEditor
      ? `Logged in as ${staffRole}`
      : "Logged in - no editing permissions";
}

staffLoginBtn.addEventListener("click", async () => {
  const email = prompt("Enter your staff email:");
  if (!email) return;

  const password = prompt("Enter your password:");
  if (password === null) return;

  const { error } =
    await supabaseClient.auth.signInWithPassword({
      email,
      password
    });

  if (error) {
    alert("Login failed: " + error.message);
    return;
  }

  await refreshStaffSession();
});

staffLogoutBtn.addEventListener("click", async () => {
  const { error } = await supabaseClient.auth.signOut();

  if (error) {
    alert("Logout failed: " + error.message);
    return;
  }

  await refreshStaffSession();
});

supabaseClient.auth.onAuthStateChange(() => {
  setTimeout(refreshStaffSession, 0);
});

refreshStaffSession();
expandAll.addEventListener("click",()=>{ allExpanded=!allExpanded; expandAll.textContent=allExpanded?"Collapse All":"Expand All"; render(); });
populateFilters(); render();
