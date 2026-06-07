const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileNav = document.querySelector("[data-mobile-nav]");
const filterButtons = document.querySelectorAll("[data-filter]");
const newsCards = document.querySelectorAll(".news-card");
const newsletterForm = document.querySelector(".newsletter-form");
const contactForm = document.querySelector("[data-contact-form]");
const contactModal = document.querySelector("[data-contact-modal]");
const contactOpenButtons = document.querySelectorAll("[data-contact-open]");
const scenarioPanel = document.querySelector("[data-scenario-panel]");
const scenarioTabs = document.querySelectorAll("[data-scenario-tab]");
const productShowcase = document.querySelector("[data-product-showcase]");
const productImage = productShowcase?.querySelector("[data-product-image]");
const productTitle = productShowcase?.querySelector("[data-product-title]");
const productCopy = productShowcase?.querySelector("[data-product-copy]");
const productSteps = productShowcase?.querySelectorAll("[data-product-step]") || [];
const leadGateLinks = document.querySelectorAll("a[href$='conportlab-company-profile.pdf']");
const navDetails = document.querySelectorAll(".desktop-nav details");
const desktopNav = document.querySelector(".desktop-nav");
const heroOsVisual = document.querySelector("[data-hero-os]");
const installPercent = document.querySelector("[data-install-percent]");
// senb.kr 연결 시 script.js 로드 전에 window.CONPORTLAB_LEAD_ENDPOINT를 지정하면 큐가 자동 전송됩니다.
const leadEndpoint = window.CONPORTLAB_LEAD_ENDPOINT || "";
const leadStorageKey = "conportlabLeadQueue";

if (heroOsVisual) {
  const setHeroProgress = () => {
    const rect = heroOsVisual.getBoundingClientRect();
    const viewport = window.innerHeight || 1;
    const raw = 1 - Math.min(Math.max(rect.top / viewport, 0), 1);
    const progress = Math.round(42 + raw * 52);
    heroOsVisual.style.setProperty("--install-progress", String(progress));
    if (installPercent) installPercent.textContent = `${progress}%`;
  };

  heroOsVisual.addEventListener("pointermove", (event) => {
    const rect = heroOsVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroOsVisual.style.setProperty("--tilt-y", `${(x * 7).toFixed(2)}deg`);
    heroOsVisual.style.setProperty("--tilt-x", `${(-y * 6).toFixed(2)}deg`);
    heroOsVisual.style.setProperty("--shift-x", `${(x * 8).toFixed(1)}px`);
    heroOsVisual.style.setProperty("--shift-y", `${(y * 8).toFixed(1)}px`);
  });

  heroOsVisual.addEventListener("pointerleave", () => {
    heroOsVisual.style.setProperty("--tilt-y", "0deg");
    heroOsVisual.style.setProperty("--tilt-x", "0deg");
    heroOsVisual.style.setProperty("--shift-x", "0px");
    heroOsVisual.style.setProperty("--shift-y", "0px");
  });

  window.addEventListener("scroll", setHeroProgress, { passive: true });
  window.addEventListener("resize", setHeroProgress);
  setHeroProgress();
}

if (!document.querySelector(".floating-actions")) {
  const quickActions = document.createElement("div");
  quickActions.className = "floating-actions";
  quickActions.setAttribute("aria-label", "빠른 문의");
  quickActions.innerHTML =
    `<a href="/conportlab-client-preview/index.html#contact" aria-label="문의 섹션으로 이동">문의</a>`;
  document.body.appendChild(quickActions);
}

const scenarios = {
  quality: {
    source: "설비 신호 + 품질 이력",
    sourceCopy: "불량 발생 시점의 온도, 압력, 작업 조건을 자동으로 묶습니다.",
    coreCopy: "현장 담당자가 쓰는 기준으로 원인 후보와 조치 순서를 구성합니다.",
    output: "불량 원인 후보 3개 제시",
    outputCopy: "검사 결과와 작업 조건을 함께 비교해 바로 확인할 조치를 보여줍니다.",
    status: "검사 이력과 설비 로그가 분리되어 원인 확인이 늦어집니다.",
    action: "작업 조건, 원재료 로트, 설비 알람을 같은 화면에서 비교합니다.",
    effect: "불량 원인 분석 시간을 줄이고 반복 품질 이슈를 조기에 차단합니다.",
  },
  equipment: {
    source: "진동·전류·알람 로그",
    sourceCopy: "설비 상태 신호와 정비 이력을 연결해 이상 패턴을 찾습니다.",
    coreCopy: "정지 전후의 운전 조건과 과거 조치 이력을 한 흐름으로 정리합니다.",
    output: "정지 위험 설비와 점검 항목 추천",
    outputCopy: "정비 우선순위와 확인 항목을 현장 작업자가 바로 볼 수 있게 제공합니다.",
    status: "돌발 정지가 발생한 뒤에야 원인을 확인하는 경우가 많습니다.",
    action: "알람, 부하, 정비 이력을 묶어 선제 점검 순서를 만들 수 있습니다.",
    effect: "비계획 정지 시간을 줄이고 보전 업무의 우선순위를 명확히 합니다.",
  },
  energy: {
    source: "전력 사용량 + 생산 실적",
    sourceCopy: "라인별 에너지 사용량과 생산량을 같은 시간 기준으로 맞춥니다.",
    coreCopy: "기준 사용량을 벗어난 설비와 공정을 자동으로 분류합니다.",
    output: "낭비 구간과 절감 액션 표시",
    outputCopy: "피크 시간, 공회전, 과다 사용 설비를 운영자가 바로 확인합니다.",
    status: "에너지 비용은 늘지만 어느 설비에서 낭비되는지 파악하기 어렵습니다.",
    action: "전력, 생산량, 설비 상태를 연결해 낭비 구간을 찾습니다.",
    effect: "에너지 사용량을 낮추고 생산 조건별 비용 구조를 투명하게 만듭니다.",
  },
};

const productSlides = [
  {
    title: "PORTA 운영관리 시스템",
    copy: "점검, 품질, 설비 상태를 No-Code 화면에서 확인하고 기록합니다.",
    image: "assets/imweb/official-home/976e6f842a27b.jpg",
    alt: "PORTA 제조 운영관리 시스템 화면",
  },
  {
    title: "PORTA AI Agent 플랫폼",
    copy: "현장 데이터를 운영 질문 단위로 묶고 AI Agent 분석 화면으로 전환합니다.",
    image: "assets/imweb/official-home/19c07d6f8b0d3.jpg",
    alt: "PORTA AI Agent 제조 데이터 화면",
  },
  {
    title: "PORTA 엣지 게이트웨이",
    copy: "설비 신호를 표준 데이터로 바꾸고 AI Factory OS와 안정적으로 연결합니다.",
    image: "assets/imweb/official-home/66eccc82eba7d.jpg",
    alt: "PORTA 엣지 게이트웨이 연결 이미지",
  },
  {
    title: "PORTA 산업용 센서",
    copy: "전류, 온도, 진동, 환경 데이터를 필요한 지점에서 수집합니다.",
    image: "assets/imweb/official-home/e6b71ad23b6b9.jpg",
    alt: "PORTA 산업용 센서와 제조 현장 이미지",
  },
];

const productHashMap = {
  "product-om": 0,
  "product-aiops": 1,
  "product-gateway": 2,
  "product-sensor": 3,
  "s202509019bc8e799ef047": 0,
  "s20250901b657223b7e56c": 1,
  "s20231114b4aacbef4336e": 2,
  "s2025090297b0844df29d1": 3,
};
const solutionLinks = document.querySelectorAll("[data-solution-link]");
const solutionSections = document.querySelectorAll("[data-solution-section]");

function hasValidEmail(form) {
  const emailInput = form.querySelector("[inputmode='email']");
  return !emailInput || emailInput.checkValidity();
}

function getLeadQueue() {
  try {
    return JSON.parse(localStorage.getItem(leadStorageKey) || "[]");
  } catch (_error) {
    return [];
  }
}

function saveLeadQueue(queue) {
  try {
    localStorage.setItem(leadStorageKey, JSON.stringify(queue));
  } catch (_error) {
    // 저장소가 막힌 브라우저에서도 다운로드 흐름은 유지합니다.
  }
}

function queueLead(lead) {
  saveLeadQueue([...getLeadQueue(), lead]);
  if (leadEndpoint) window.setTimeout(syncQueuedLeads, 0);
}

async function syncQueuedLeads() {
  if (!leadEndpoint) return;

  const queue = getLeadQueue();
  if (!queue.length) return;

  const remaining = [];
  for (const lead of queue) {
    try {
      const response = await fetch(leadEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!response.ok) remaining.push(lead);
    } catch (_error) {
      remaining.push(lead);
    }
  }
  saveLeadQueue(remaining);
}

function createLeadModal() {
  const modal = document.createElement("div");
  modal.className = "lead-gate-backdrop";
  modal.setAttribute("hidden", "");
  modal.innerHTML = `
    <div class="lead-gate-dialog" role="dialog" aria-modal="true" aria-labelledby="lead-gate-title">
      <button class="lead-gate-close" type="button" aria-label="닫기" data-lead-close></button>
      <form class="lead-gate-form" data-lead-form>
        <p class="eyebrow">자료 다운로드</p>
        <h2 id="lead-gate-title">회사소개서를 받을 이메일을 입력해 주세요</h2>
        <p>업무 이메일을 남기면 PDF 다운로드가 바로 시작됩니다. 회사명과 연락처는 선택 입력입니다.</p>
        <div class="lead-field-grid">
          <label>업무 이메일<input name="email" type="email" inputmode="email" autocomplete="email" placeholder="work@email.com" required></label>
          <label>회사명<input name="company" type="text" autocomplete="organization" placeholder="회사명"></label>
          <label>이름<input name="name" type="text" autocomplete="name" placeholder="홍길동"></label>
          <label>연락처<input name="phone" type="tel" autocomplete="tel" placeholder="선택 입력"></label>
        </div>
        <label class="lead-consent"><input name="consent" type="checkbox" required> 자료 제공과 후속 안내를 위한 개인정보 수집·이용에 동의합니다.</label>
        <button class="button" type="submit">이메일 남기고 다운로드</button>
        <p class="lead-gate-message" data-lead-message aria-live="polite"></p>
      </form>
    </div>
  `;
  document.body.appendChild(modal);
  return modal;
}

const leadModal = leadGateLinks.length ? createLeadModal() : null;
let pendingLeadLink = null;

function closeLeadModal() {
  if (!leadModal) return;
  leadModal.setAttribute("hidden", "");
  document.body.classList.remove("lead-modal-open");
  pendingLeadLink = null;
}

function openLeadModal(link) {
  if (!leadModal) return;
  pendingLeadLink = link;
  leadModal.removeAttribute("hidden");
  document.body.classList.add("lead-modal-open");

  const message = leadModal.querySelector("[data-lead-message]");
  const form = leadModal.querySelector("[data-lead-form]");
  if (message) message.textContent = "";
  if (form) {
    form.dataset.resource = link.href;
    form.reset();
    requestAnimationFrame(() => form.querySelector("input[name='email']")?.focus());
  }
}

function closeContactModal() {
  if (!contactModal) return;
  contactModal.setAttribute("hidden", "");
  document.body.classList.remove("contact-modal-open");
}

function openContactModal() {
  if (!contactModal || !contactForm) return;
  contactModal.removeAttribute("hidden");
  document.body.classList.add("contact-modal-open");

  const message = contactForm.querySelector("[data-contact-message]");
  if (message) message.textContent = "";
  requestAnimationFrame(() => contactForm.querySelector("input[name='company']")?.focus());
}

function startDownload(link) {
  const opened = window.open(link.href, "_blank", "noopener");
  if (!opened) window.location.assign(link.href);
}

syncQueuedLeads();

let activeProductIndex = -1;
let productScrollFrame = null;
let productManualLockUntil = 0;

function setProductShowcase(index) {
  if (!productShowcase || !productImage || !productTitle || !productCopy) return;
  const nextIndex = Math.max(0, Math.min(index, productSlides.length - 1));
  if (nextIndex === activeProductIndex) return;

  const slide = productSlides[nextIndex];
  activeProductIndex = nextIndex;
  productShowcase.dataset.activeProduct = String(nextIndex);
  productImage.style.opacity = "0";

  window.setTimeout(() => {
    productImage.src = slide.image;
    productImage.alt = slide.alt;
    productTitle.textContent = slide.title;
    productCopy.textContent = slide.copy;
    productImage.style.opacity = "1";
  }, 110);

  productSteps.forEach((step) => {
    const isActive = Number(step.dataset.productStep) === nextIndex;
    step.setAttribute("aria-current", String(isActive));
  });
}

function updateProductShowcaseFromScroll() {
  productScrollFrame = null;
  if (!productShowcase) return;
  if (window.performance.now() < productManualLockUntil) return;

  const hash = window.location.hash.slice(1);
  if (productShowcase && Object.prototype.hasOwnProperty.call(productHashMap, hash)) {
    setProductShowcase(productHashMap[hash]);
    return;
  }

  const section = productShowcase.closest(".platform-section");
  if (!section) return;

  const start = section.offsetTop - 80;
  const range = Math.max(section.offsetHeight * 0.92, window.innerHeight * 0.72);
  const progress = Math.max(0, Math.min(0.999, (window.scrollY - start) / range));
  const index = Math.floor(progress * productSlides.length);
  setProductShowcase(index);
}

function scheduleProductShowcaseUpdate() {
  if (!productShowcase || productScrollFrame) return;
  productScrollFrame = window.requestAnimationFrame(updateProductShowcaseFromScroll);
}

productSteps.forEach((step) => {
  step.addEventListener("click", () => {
    productManualLockUntil = window.performance.now() + 2200;
    setProductShowcase(Number(step.dataset.productStep || 0));
  });
});

setProductShowcase(0);
scheduleProductShowcaseUpdate();

function updateHeader() {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 12);
}

function getSolutionHashTarget() {
  const hash = window.location.hash.slice(1);
  if (!hash) return null;
  return document.getElementById(hash)?.closest("[data-solution-section]") || null;
}

function scrollToExactWithoutMotion(top) {
  const root = document.documentElement;
  const previousBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo(0, top);
  requestAnimationFrame(() => {
    root.style.scrollBehavior = previousBehavior;
  });
}

function getHeaderOffset(extra = 18) {
  return (header?.getBoundingClientRect().height || 0) + extra;
}

function getSolutionScrollTop(section) {
  const heading = section.querySelector(".solution-story-heading") || section;
  return Math.max(0, heading.getBoundingClientRect().top + window.scrollY - getHeaderOffset());
}

function alignHashTarget() {
  const hash = window.location.hash.slice(1);
  if (!hash || hash === "top") return;

  const solutionTarget = getSolutionHashTarget();
  if (document.body.classList.contains("solution-page") && solutionTarget) {
    requestAnimationFrame(() => {
      scrollToExactWithoutMotion(getSolutionScrollTop(solutionTarget));
    });
    return;
  }

  if (document.body.classList.contains("product-page") && Object.prototype.hasOwnProperty.call(productHashMap, hash)) {
    const productTarget = document.getElementById(hash)?.closest(".product-official-section");
    if (productTarget) {
      requestAnimationFrame(() => {
        const headerOffset = header?.getBoundingClientRect().height || 0;
        scrollToExactWithoutMotion(productTarget.getBoundingClientRect().top + window.scrollY - headerOffset);
      });
      return;
    }
  }

  if (productShowcase && Object.prototype.hasOwnProperty.call(productHashMap, hash)) {
    const index = productHashMap[hash];
    const target = productShowcase?.closest(".platform-section") || document.getElementById("company");
    setProductShowcase(index);
    if (target) {
      requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
      window.setTimeout(() => setProductShowcase(index), 160);
    }
    return;
  }

  const target = document.getElementById(hash);
  if (!target) return;
  requestAnimationFrame(() => {
    if (target.classList.contains("anchor-alias")) {
      const top = target.getBoundingClientRect().top + window.scrollY;
      scrollToExactWithoutMotion(top);
      return;
    }
    target.scrollIntoView({ block: "start" });
  });
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("scroll", scheduleProductShowcaseUpdate, { passive: true });
window.addEventListener("resize", scheduleProductShowcaseUpdate);
window.addEventListener("load", () => {
  updateHeader();
  scheduleProductShowcaseUpdate();
  alignHashTarget();
  window.setTimeout(alignHashTarget, 120);
  window.setTimeout(alignHashTarget, 900);
  window.setTimeout(alignHashTarget, 1800);
});
window.addEventListener("hashchange", () => {
  updateHeader();
  alignHashTarget();
});
requestAnimationFrame(updateHeader);

if (navDetails.length) {
  document.addEventListener("click", (event) => {
    if (event.target.closest(".desktop-nav details")) return;
    navDetails.forEach((item) => item.removeAttribute("open"));
  });
}

if (desktopNav) {
  const openMegaMenu = () => desktopNav.classList.add("mega-open");
  const closeMegaMenu = () => {
    if (!desktopNav.matches(":focus-within") && !desktopNav.querySelector("details[open]")) {
      desktopNav.classList.remove("mega-open");
    }
  };

  desktopNav.addEventListener("mouseenter", openMegaMenu);
  desktopNav.addEventListener("mouseleave", closeMegaMenu);
  desktopNav.addEventListener("focusin", openMegaMenu);
  desktopNav.addEventListener("focusout", () => window.setTimeout(closeMegaMenu, 80));
}

if (menuButton && mobileNav && header) {
  menuButton.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    header.classList.toggle("menu-open", isOpen);
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      header.classList.remove("menu-open");
    });
  });
}

function updateScenario(key) {
  const scenario = scenarios[key];
  if (!scenarioPanel || !scenario) return;

  const fields = {
    source: "[data-scenario-source]",
    sourceCopy: "[data-scenario-source-copy]",
    coreCopy: "[data-scenario-core-copy]",
    output: "[data-scenario-output]",
    outputCopy: "[data-scenario-output-copy]",
    status: "[data-scenario-status]",
    action: "[data-scenario-action]",
    effect: "[data-scenario-effect]",
  };

  Object.entries(fields).forEach(([field, selector]) => {
    const target = scenarioPanel.querySelector(selector);
    if (target) target.textContent = scenario[field];
  });

  scenarioTabs.forEach((tab) => {
    const isActive = tab.dataset.scenarioTab === key;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });
}

scenarioTabs.forEach((tab) => {
  tab.addEventListener("click", () => updateScenario(tab.dataset.scenarioTab));
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    newsCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!hasValidEmail(newsletterForm)) {
      newsletterForm.reportValidity();
      return;
    }
    newsletterForm.querySelector("[data-newsletter-message]").textContent =
      "뉴스레터 구독 신청이 접수되었습니다.";
    newsletterForm.reset();
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const contactLead = {};
    for (const [key, value] of new FormData(contactForm).entries()) {
      if (value && typeof value === "object" && "name" in value && "size" in value) {
        if (value.name) contactLead.attachmentName = value.name;
        continue;
      }
      contactLead[key] = String(value).trim();
    }
    queueLead({
      ...contactLead,
      type: "contact",
      source: window.location.pathname + window.location.hash,
      createdAt: new Date().toISOString(),
    });

    const message = contactForm.querySelector("[data-contact-message]");
    if (message) {
      message.textContent =
        "문의가 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.";
    }
    contactForm.reset();
  });
}

contactOpenButtons.forEach((button) => {
  button.addEventListener("click", openContactModal);
});

if (contactModal) {
  contactModal.addEventListener("click", (event) => {
    if (event.target === contactModal || event.target.closest("[data-contact-close]")) {
      closeContactModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !contactModal.hasAttribute("hidden")) {
      closeContactModal();
    }
  });
}

leadGateLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    openLeadModal(link);
  });
});

if (leadModal) {
  leadModal.addEventListener("click", (event) => {
    if (event.target === leadModal || event.target.closest("[data-lead-close]")) {
      closeLeadModal();
    }
  });

  leadModal.querySelector("[data-lead-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const message = form.querySelector("[data-lead-message]");
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const lead = {
      type: "company_profile_download",
      resource: form.dataset.resource,
      name: String(formData.get("name") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      page: window.location.href,
      createdAt: new Date().toISOString(),
      source: "conportlab_landing",
    };

    const submitButton = form.querySelector("button[type='submit']");
    if (submitButton) submitButton.disabled = true;
    if (message) message.textContent = "자료를 준비하고 있습니다.";

    queueLead(lead);
    if (pendingLeadLink) startDownload(pendingLeadLink);
    if (message) message.textContent = "입력 정보가 저장되었습니다. 다운로드를 시작합니다.";
    form.reset();
    window.setTimeout(closeLeadModal, 900);
    if (submitButton) submitButton.disabled = false;
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !leadModal.hasAttribute("hidden")) closeLeadModal();
  });
}

const revealTargets = Array.from(
  document.querySelectorAll(
    "[data-reveal], .product-showcase, .solution-card, .case-card, .seo-blog-grid article, .reference-customer-strip article, .reference-case-board article, .company-proof-grid article, .channel-list a, .newsletter-form, .news-card"
  )
).filter((target) => !(document.body.classList.contains("solution-page") && target.closest(".solution-story")));

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.14 }
  );

  revealTargets.forEach((target) => {
    target.setAttribute("data-reveal", "");
    revealObserver.observe(target);
  });
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

const solutionRevealTargets = document.body.classList.contains("solution-page")
  ? document.querySelectorAll(".solution-story [data-reveal]")
  : [];

if (solutionRevealTargets.length) {
  if ("IntersectionObserver" in window) {
    const solutionRevealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (entry.boundingClientRect.top > window.innerHeight || entry.boundingClientRect.bottom < 0) return;
          entry.target.classList.add("is-visible");
          solutionRevealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.14 }
    );

    solutionRevealTargets.forEach((target) => {
      target.classList.remove("is-visible");
      solutionRevealObserver.observe(target);
    });
  } else {
    solutionRevealTargets.forEach((target) => target.classList.add("is-visible"));
  }
}

if (solutionLinks.length && solutionSections.length) {
  const solutionHashIds = Array.from(solutionSections, (section) => {
    const alias = section.querySelector(".anchor-alias[id]");
    return alias?.id;
  }).filter(Boolean);

  const setActiveSolution = (id) => {
    solutionLinks.forEach((link) => {
      const isActive = link.dataset.solutionLink === id;
      if (isActive) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  };

  const easeSolutionScroll = (targetTop, onComplete) => {
    const startTop = window.scrollY;
    const distance = targetTop - startTop;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;

    if (reducedMotion || Math.abs(distance) < 8) {
      window.scrollTo(0, targetTop);
      onComplete?.();
      return;
    }

    const duration = Math.min(820, Math.max(740, Math.abs(distance) * 0.28));
    const startDelay = 185;
    const easeInOutQuart = (t) =>
      t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

    window.cancelAnimationFrame(window.solutionScrollFrame || 0);
    window.clearTimeout(window.solutionScrollDelay);
    if (typeof window.solutionScrollRestore === "function") window.solutionScrollRestore();
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.solutionScrollRestore = () => {
      root.style.scrollBehavior = previousBehavior;
      window.solutionScrollRestore = null;
    };

    const finish = () => {
      window.solutionScrollRestore?.();
      onComplete?.();
    };

    const startedAt = () => window.performance.now();
    let animationStartedAt = 0;
    const step = (now) => {
      if (!animationStartedAt) animationStartedAt = startedAt();
      const progress = Math.min(1, (now - animationStartedAt) / duration);
      window.scrollTo(0, startTop + distance * easeInOutQuart(progress));
      if (progress < 1) {
        window.solutionScrollFrame = window.requestAnimationFrame(step);
      } else {
        finish();
      }
    };

    window.solutionScrollDelay = window.setTimeout(() => {
      window.solutionScrollFrame = window.requestAnimationFrame(step);
    }, startDelay);
  };

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link) return;

    try {
      const url = new URL(link.href, window.location.href);
      const currentPath = window.location.pathname.replace(/\/index\.html$/, "").replace(/\/$/, "");
      const targetPath = url.pathname.replace(/\/index\.html$/, "").replace(/\/$/, "");
      const hashId = url.hash.slice(1);
      const sameSolutionPage = currentPath === targetPath;
      if (!sameSolutionPage || !solutionHashIds.includes(hashId)) return;

      const hashTarget = document.getElementById(hashId);
      const section = hashTarget?.closest("[data-solution-section]");
      if (!section) return;

      event.preventDefault();
      setActiveSolution(section.id);
      if (window.location.hash !== url.hash) window.history.pushState(null, "", url.hash);
      easeSolutionScroll(getSolutionScrollTop(section));
    } catch (_error) {
      // 잘못된 URL 형식은 기본 브라우저 동작에 맡깁니다.
    }
  });

  const solutionObserver = "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            setActiveSolution(entry.target.id);
          });
        },
        { rootMargin: "-38% 0px -52% 0px", threshold: 0.01 }
      )
    : null;

  solutionSections.forEach((section) => solutionObserver?.observe(section));

  const currentHash = window.location.hash.slice(1);
  const currentTarget =
    document.getElementById(currentHash)?.closest("[data-solution-section]") ||
    document.querySelector("[data-solution-section]");
  if (currentTarget) setActiveSolution(currentTarget.id);
}
