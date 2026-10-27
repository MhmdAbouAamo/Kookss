/* Operation: Level 28 — page logic. You normally don't need to edit this file.
   Personalize everything in js/config.js. */
const CONFIG = window.CONFIG;

(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const STORE = "level28-draft-v1";
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const her = CONFIG.herName.trim();
  const nick = (CONFIG.nickname || "").trim() || her;
  const me = CONFIG.myName.trim();
  let rsvp = "";

  /* ---------- personalize ---------- */
  if (her) {
    $("#toName").textContent = nick && nick !== her ? `${her} (a.k.a. ${nick})` : her;
    $("#passName").textContent = her;
    $("#envTo").textContent = "For " + nick;
    $("#letterHi").textContent = `Dear ${nick},`;
    $("#letterHi").hidden = false;
    $("#rsvp-title").textContent = `So, ${nick}… are we doing this?`;
  }
  if (me) {
    $("#letterSig").textContent = "— " + me;
    $("#passPlanner").textContent = me;
  }
  $("#cdDate").textContent = CONFIG.eventDateLabel;
  if (CONFIG.whatsappNumber.trim()) {
    $("#privacyText").textContent = "Nothing is sent automatically. Tapping the button opens WhatsApp with your answers typed in; you review them and tap send yourself.";
  } else {
    $("#privacyText").textContent = "Nothing is sent automatically. Tapping the button opens WhatsApp with your answers typed in; pick the chat, review, and tap send yourself.";
  }

  /* ---------- render options ---------- */
  function cardHTML(group, o) {
    return `<label class="opt"><input type="checkbox" name="${group}" value="${esc(o.id)}" id="${group}-${esc(o.id)}">` +
      `<span class="opt-body"><span class="opt-top"><i data-lucide="${esc(o.icon)}"></i><span class="opt-code">${esc(o.code)}</span></span>` +
      `<span class="opt-title">${esc(o.title)}</span><span class="opt-desc">${esc(o.desc)}</span>` +
      `<span class="opt-tick" aria-hidden="true">✓</span></span></label>`;
  }
  $("#breakfastOpts").innerHTML = CONFIG.breakfast.map(o => cardHTML("breakfast", o)).join("");
  $("#lunchOpts").innerHTML = CONFIG.lunch.map(o => cardHTML("lunch", o)).join("");
  $("#drinkOpts").innerHTML = CONFIG.drinks.map(o =>
    `<label class="pill"><input type="radio" name="drink" value="${esc(o.id)}" id="drink-${esc(o.id)}"><span><i data-lucide="${esc(o.icon)}"></i>${esc(o.title)}</span></label>`
  ).join("");
  $("#termsList").innerHTML = CONFIG.terms.map((t, i) =>
    `<li class="term"><span class="tn">${String(i + 1).padStart(2, "0")}</span><p>${esc(t[0])}${t[1] ? `<small>${esc(t[1])}</small>` : ""}</p></li>`
  ).join("");

  function icons() { try { if (window.lucide) window.lucide.createIcons(); } catch (e) { /* icons are decorative */ } }
  icons();

  /* ---------- unlock ---------- */
  const exp = $("#experience");
  const unlockBtn = $("#unlockBtn");
  unlockBtn.addEventListener("click", () => {
    const first = exp.hidden;
    exp.hidden = false;
    $("#topbar").hidden = false;
    $("#gate").classList.add("unlocked");
    $("#sealText").innerHTML = "Access<br>granted";
    unlockBtn.setAttribute("aria-expanded", "true");
    unlockBtn.querySelector("span").textContent = "Unlocked. Scroll on";
    if (first) {
      if (!reduceMotion) exp.classList.add("revealing");
      armMap();
      icons();
      save({ unlocked: true });
    }
    setTimeout(() => {
      $("#experience .countdown").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }, first && !reduceMotion ? 380 : 0);
  });

  /* ---------- route drawing ---------- */
  function armMap() {
    const map = $("#map");
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    map.classList.add("armed");
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { map.classList.add("drawn"); io.disconnect(); }
      });
    }, { threshold: 0.35 });
    io.observe(map);
    // Safety: never leave the route hidden.
    setTimeout(() => map.classList.add("drawn"), 15000);
  }
  // #routeDraw is a map-colored mask over the dashed route. Resting state: mask moved off, route visible.
  // .armed lays the mask over the route; .drawn slides it away so the route appears to draw itself.

  /* ---------- countdown ---------- */
  const target = new Date(CONFIG.eventStart).getTime();
  const pad = n => String(n).padStart(2, "0");
  function tick() {
    const now = Date.now();
    let diff = target - now;
    const els = { d: $("#cdD"), h: $("#cdH"), m: $("#cdM"), s: $("#cdS") };
    if (isNaN(target)) { $("#cdNote").textContent = "Date to be confirmed by the Department."; return; }
    if (diff <= 0) {
      els.d.textContent = els.h.textContent = els.m.textContent = els.s.textContent = "00";
      const dayOver = now - target > 24 * 3600 * 1000;
      $("#cdNote").textContent = dayOver ? "Mission complete. Hope it was a good one." : "It’s today. Sneakers on. Mission is live.";
      $("#miniCountdown").textContent = dayOver ? "Mission complete" : "Today’s the day";
      return;
    }
    const d = Math.floor(diff / 86400000); diff -= d * 86400000;
    const h = Math.floor(diff / 3600000); diff -= h * 3600000;
    const m = Math.floor(diff / 60000); diff -= m * 60000;
    const s = Math.floor(diff / 1000);
    els.d.textContent = pad(d); els.h.textContent = pad(h); els.m.textContent = pad(m); els.s.textContent = pad(s);
    $("#miniCountdown").textContent = `T-${d}d ${pad(h)}:${pad(m)}:${pad(s)}`;
    $("#cdNote").textContent = d >= 7
      ? "Plenty of time to choose sneakers. Not enough time to guess the destination."
      : d >= 1 ? "Final approach. Charge your phone, clear your Sunday." : "Under a day. Lay out the outfit. Sleep. Trust the process.";
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- mystery peeks ---------- */
  const peekIdx = [0, 0, 0, 0];
  $$(".mystery").forEach(btn => {
    btn.addEventListener("click", () => {
      const k = +btn.dataset.peek;
      const lines = CONFIG.peeks[k];
      btn.querySelector(".mp").textContent = lines[peekIdx[k] % lines.length];
      peekIdx[k]++;
      if (!reduceMotion) btn.animate([{ transform: "translateX(0)" }, { transform: "translateX(-5px)" }, { transform: "translateX(5px)" }, { transform: "translateX(-3px)" }, { transform: "translateX(0)" }], { duration: 320 });
    });
  });

  /* ---------- envelope ---------- */
  const env = $("#envelope"), letter = $("#letter");
  env.addEventListener("click", () => {
    const open = env.getAttribute("aria-expanded") === "true";
    env.setAttribute("aria-expanded", String(!open));
    letter.hidden = open;
    if (!open) {
      letter.classList.remove("open"); void letter.offsetWidth; letter.classList.add("open");
      setTimeout(() => letter.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" }), 250);
    }
  });

  /* ---------- "Other" reveal fields ---------- */
  function syncOthers() {
    const pairs = [
      [$("#breakfast-other"), "#tf-breakfastOther"],
      [$("#lunch-other"), "#tf-lunchOther"],
      [$("#drink-other"), "#tf-drinkOther"]
    ];
    pairs.forEach(([input, sel]) => {
      const box = $(sel);
      const show = input && input.checked;
      if (show && box.hidden) { box.hidden = false; box.classList.add("reveal"); }
      if (!show) box.hidden = true;
    });
  }

  /* ---------- RSVP ---------- */
  const rsvpLabels = {
    yes: "Yes, let’s make memories!",
    obviously: "Obviously. I’m turning 28!",
    info: "I need more information."
  };
  function setRsvp(val, fromUser) {
    rsvp = val;
    $$("#rsvpGroup .btn").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.rsvp === val)));
    $("#infoPanel").hidden = val !== "info";
    $("#rsvpState").textContent = val
      ? (val === "info" ? "Noted: more information requested. You can still confirm with one of the buttons above."
                        : "Confirmed: " + rsvpLabels[val] + " Now send your answers below.")
      : "";
    $("#err-rsvp").hidden = true;
    $("#rsvpGroup").classList.remove("has-error");
    if (fromUser && (val === "yes" || val === "obviously")) openModal();
    if (fromUser && val === "info") setTimeout(() => $("#question").focus({ preventScroll: false }), 50);
    update();
  }
  $$("#rsvpGroup .btn").forEach(b => b.addEventListener("click", () => setRsvp(b.dataset.rsvp, true)));

  /* ---------- modal + confetti ---------- */
  const modal = $("#modal");
  let lastFocus = null;
  function openModal() {
    lastFocus = document.activeElement;
    modal.hidden = false;
    $("#modalTitle").focus();
    confetti();
  }
  function closeModal(goSend) {
    modal.hidden = true;
    if (goSend) {
      const target = needsFood() ? "#breakfast" : "#dispatch";
      $(target).scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    } else if (lastFocus) lastFocus.focus();
  }
  $("#modalGo").addEventListener("click", () => closeModal(true));
  $("#modalClose").addEventListener("click", () => closeModal(false));
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(false); });
  document.addEventListener("keydown", e => {
    if (modal.hidden) return;
    if (e.key === "Escape") closeModal(false);
    if (e.key === "Tab") {
      const f = $$("button, [href], input, textarea, [tabindex]:not([tabindex='-1'])", modal);
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  function confetti() {
    if (reduceMotion) return;
    const c = $("#confetti");
    c.hidden = false;
    const ctx = c.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = window.innerWidth, H = window.innerHeight;
    c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const colors = ["#B5602E", "#5A6238", "#1C1B18", "#E5D8C0", "#F0B58C"];
    const parts = Array.from({ length: 150 }, () => ({
      x: W / 2 + (Math.random() - .5) * 80, y: H * .42,
      vx: (Math.random() - .5) * 14, vy: -Math.random() * 15 - 4,
      w: 6 + Math.random() * 6, h: 8 + Math.random() * 10,
      r: Math.random() * Math.PI, vr: (Math.random() - .5) * .3,
      c: colors[(Math.random() * colors.length) | 0],
      num: Math.random() < .08
    }));
    const start = performance.now();
    (function frame(t) {
      const el = t - start;
      ctx.clearRect(0, 0, W, H);
      parts.forEach(p => {
        p.vy += .38; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
        ctx.globalAlpha = Math.max(0, 1 - el / 3600);
        ctx.fillStyle = p.c;
        if (p.num) { ctx.font = "900 20px 'Big Shoulders Display', Impact, sans-serif"; ctx.fillText("28", -10, 7); }
        else ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      if (el < 3600) requestAnimationFrame(frame);
      else { ctx.clearRect(0, 0, W, H); c.hidden = true; }
    })(start);
  }

  /* ---------- collect + summary ---------- */
  const checked = name => $$(`input[name="${name}"]:checked`).map(i => i.value);
  const val = id => ($("#" + id).value || "").trim();
  const titleOf = (list, id) => (list.find(o => o.id === id) || {}).title || id;

  function collect() {
    return {
      breakfast: checked("breakfast"),
      breakfastOther: val("breakfastOther"),
      breakfastNotes: val("breakfastNotes"),
      drink: checked("drink")[0] || "",
      drinkOther: val("drinkOther"),
      lunch: checked("lunch"),
      lunchOther: val("lunchOther"),
      lunchCraving: val("lunchCraving"),
      lunchAvoid: val("lunchAvoid"),
      dietary: val("dietary"),
      question: val("question"),
      rsvp
    };
  }
  function needsFood() {
    const d = collect();
    return !d.breakfast.length || !d.drink || !d.lunch.length;
  }
  function listText(list, ids, otherText) {
    return ids.map(id => id === "other" ? `Other: ${otherText || "(not specified yet)"}` : titleOf(list, id)).join(", ");
  }
  function summary(d) {
    const L = [];
    L.push("*OPERATION: LEVEL 28 — Mission response*");
    if (her) L.push(`From: ${nick && nick !== her ? `${her} (${nick})` : her}`);
    L.push(`Date: ${CONFIG.eventDateLabel}`);
    L.push("");
    L.push(`*RSVP:* ${d.rsvp ? rsvpLabels[d.rsvp] : "(not answered yet)"}`);
    L.push("");
    L.push("*Breakfast*");
    L.push(`Choice: ${d.breakfast.length ? listText(CONFIG.breakfast, d.breakfast, d.breakfastOther) : "(not chosen yet)"}`);
    if (d.breakfastNotes) L.push(`Specifically: ${d.breakfastNotes}`);
    const drink = d.drink ? (d.drink === "other" ? `Something else: ${d.drinkOther || "(not specified yet)"}` : titleOf(CONFIG.drinks, d.drink)) : "(not chosen yet)";
    L.push(`Drink: ${drink}`);
    L.push("");
    L.push("*Lunch*");
    L.push(`Choice: ${d.lunch.length ? listText(CONFIG.lunch, d.lunch, d.lunchOther) : "(not chosen yet)"}`);
    if (d.lunchCraving) L.push(`Craving: ${d.lunchCraving}`);
    if (d.lunchAvoid) L.push(`Prefer to avoid: ${d.lunchAvoid}`);
    L.push(`Allergies / dietary: ${d.dietary || "None mentioned"}`);
    if (d.question) { L.push(""); L.push(`*Question for HQ:* ${d.question}`); }
    L.push("");
    L.push("Dress code acknowledged: Sport casual ✔");
    return L.join("\n");
  }

  /* ---------- validation ---------- */
  function showErr(id, msg, groupId) {
    const el = $("#" + id);
    el.textContent = msg || "";
    el.hidden = !msg;
    if (groupId) $("#" + groupId).classList.toggle("has-error", !!msg);
  }
  function validate(show) {
    const d = collect();
    const errs = [];
    const add = (cond, id, group, msg, anchor) => {
      if (cond) errs.push({ msg, anchor });
      if (show || !cond) showErr(id, cond ? msg : "", group);
    };
    add(!d.breakfast.length, "err-breakfast", "g-breakfast", "Pick at least one breakfast option, or choose “Surprise me!”.", "#g-breakfast");
    add(d.breakfast.includes("other") && !d.breakfastOther, "err-breakfastOther", null, "You picked “Other” for breakfast. Tell me what you have in mind.", "#breakfastOther");
    add(!d.drink, "err-drink", "g-drink", "Choose a drink so the morning starts correctly.", "#g-drink");
    add(d.drink === "other" && !d.drinkOther, "err-drinkOther", null, "You picked “Something else” to drink. Tell me what it is.", "#drinkOther");
    add(!d.lunch.length, "err-lunch", "g-lunch", "Pick at least one lunch option, or choose “Surprise me!”.", "#g-lunch");
    add(d.lunch.includes("other") && !d.lunchOther, "err-lunchOther", null, "You picked “Other” for lunch. Tell me what you have in mind.", "#lunchOther");
    add(!d.rsvp, "err-rsvp", "rsvpGroup", "Answer the RSVP: are we doing this?", "#rsvp");
    return errs;
  }
  function renderErrBox(errs) {
    const box = $("#errBox");
    if (!errs.length) { box.hidden = true; box.innerHTML = ""; return; }
    box.innerHTML = `<b>Almost. ${errs.length === 1 ? "One thing" : errs.length + " things"} still missing:</b><ul>` +
      errs.map(e => `<li><a href="${e.anchor}" data-jump="${e.anchor}">${esc(e.msg)}</a></li>`).join("") + "</ul>";
    box.hidden = false;
    box.focus({ preventScroll: true });
    box.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
  }
  $("#errBox").addEventListener("click", e => {
    const a = e.target.closest("[data-jump]");
    if (!a) return;
    e.preventDefault();
    const t = $(a.dataset.jump);
    t.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    const f = t.matches("input,textarea") ? t : t.querySelector("input,button");
    if (f) setTimeout(() => f.focus({ preventScroll: true }), 350);
  });

  /* ---------- WhatsApp + copy ---------- */
  function waHref(text) {
    const num = CONFIG.whatsappNumber.replace(/\D/g, "");
    return (num ? `https://wa.me/${num}` : "https://wa.me/") + "?text=" + encodeURIComponent(text);
  }
  function update() {
    const d = collect();
    const text = summary(d);
    $("#preview").textContent = text;
    $("#waBtn").href = waHref(text);
    syncOthers();
    save();
  }
  $("#waBtn").addEventListener("click", e => {
    const errs = validate(true);
    if (errs.length) { e.preventDefault(); renderErrBox(errs); return; }
    renderErrBox([]);
    $("#waBtn").href = waHref(summary(collect()));
    $("#toast").textContent = "Opening WhatsApp. Your answers are typed in. Tap send there to deliver them.";
  });
  $("#copyBtn").addEventListener("click", () => {
    const errs = validate(true);
    if (errs.length) { renderErrBox(errs); return; }
    renderErrBox([]);
    const text = summary(collect());
    const fb = $("#copyFallback");
    const fallback = () => {
      fb.value = text; fb.hidden = false; fb.focus(); fb.select();
      $("#toast").textContent = "Copy didn’t work automatically. The text is selected below; copy it and send it to me.";
    };
    try {
      navigator.clipboard.writeText(text).then(() => {
        fb.hidden = true;
        $("#toast").textContent = "Copied. Paste it into a message to me. It hasn’t been sent yet.";
      }, fallback);
    } catch (err) { fallback(); }
  });

  /* ---------- draft persistence (this phone only) ---------- */
  function save(extra) {
    try {
      const prev = JSON.parse(localStorage.getItem(STORE) || "{}");
      localStorage.setItem(STORE, JSON.stringify(Object.assign(prev, collect(), extra || {})));
    } catch (e) { /* storage unavailable: fine */ }
  }
  function restore() {
    let d;
    try { d = JSON.parse(localStorage.getItem(STORE) || "null"); } catch (e) { d = null; }
    if (!d) return;
    (d.breakfast || []).forEach(v => { const i = $(`#breakfast-${CSS.escape(v)}`); if (i) i.checked = true; });
    (d.lunch || []).forEach(v => { const i = $(`#lunch-${CSS.escape(v)}`); if (i) i.checked = true; });
    if (d.drink) { const i = $(`#drink-${CSS.escape(d.drink)}`); if (i) i.checked = true; }
    ["breakfastOther", "breakfastNotes", "drinkOther", "lunchOther", "lunchCraving", "lunchAvoid", "dietary", "question"]
      .forEach(k => { if (typeof d[k] === "string") $("#" + k).value = d[k]; });
    if (d.rsvp && rsvpLabels[d.rsvp]) setRsvp(d.rsvp, false);
  }

  document.addEventListener("input", e => {
    if (!e.target.closest("#experience")) return;
    update();
    // clear an error as soon as it is fixed
    if (!$("#errBox").hidden || $$(".err:not([hidden])").length) validate(false);
  });
  document.addEventListener("change", e => {
    if (!e.target.closest("#experience")) return;
    update();
    if ($$(".err:not([hidden])").length) validate(false);
  });

  restore();
  update();
})();
