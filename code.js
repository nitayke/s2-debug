// Shvushon 2 - Debug (Refactored for Cloud Firestore)

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-analytics.js";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  setDoc,
  increment
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAm7hTWEmt1JRX3JXpq_dDNQWo0KKKC008",
  authDomain: "shvushon2.firebaseapp.com",
  projectId: "shvushon2",
  storageBucket: "shvushon2.appspot.com",
  messagingSenderId: "833572668563",
  appId: "1:833572668563:web:efd646d875de094f203966",
  measurementId: "G-VTT9E38KE8"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);
const db = getFirestore(app);

// DOM Elements
const startSection = document.querySelector('.start-section');
const beynishStartSection = document.querySelector('.beynish-start-section');
const conceptsSection = document.querySelector('.concepts-section');
const resultSection = document.querySelector('.result-section');
const yeshivaInput = document.getElementById('autocomplete-input');
const shioorSelect = document.getElementById('shioor');
const cbInput = document.getElementById('cb');

const loaderCircle = document.querySelector(".loader-circle");
const loaderLine = document.querySelector(".loader-line");
const loaderClock = document.querySelector(".loader-clock");
const loaderText = document.querySelector(".loader-text");
const darkScreen = document.querySelector(".dark-screen");
const whatsappLink = document.querySelector('.whatsapp-link');

// Hide inactive sections on boot
if (conceptsSection) conceptsSection.classList.add('hidden');
if (resultSection) resultSection.classList.add('hidden');

// Institutional sizes for Bayesian/normalizing calculation
const godel = {
  "אור וישועה": 60, "אור עציון": 160, "אור עקיבא": 20, "אורות אשקלון": 20,
  "אורות כרמיאל": 30, "אורות נתניה": 50, "אורות שאול": 160, "איילת השחר – אילת": 120,
  "איתמר": 150, "אפיקי דעת – שדרות": 500, "ארץ הצבי – פדואל": 20, "אש התורה": 20, "באר התחיה": 10,
  "בית אל": 300, "בית המדרש ראש פינה": 10, "ברוכין": 160, "ברכת יוסף – אלון מורה": 130,
  "ברכת משה – מעלה אדומים": 200, "גבעת אולגה": 230, "הישיבה הגבוהה בגמזו": 10,
  "הישיבה הגבוהה בני נצרים": 20, "הר ברכה": 110, "הר המור": 600, "הר עציון": 350,
  "הר שלום – חומש": 10, "חולון": 35, "טפחות": 110, "יפו – שירת משה": 140, "ירוחם": 250,
  "ישיבת הגולן – חיספין": 150, "ישיבת ההסדר דימונה": 70, "ישיבת ההסדר צפת": 135,
  "ישיבת הכותל": 350, "ישיבת המקדש": 13, "ישיבת חומש המתחדשת": 10, "ישיבת עלי – בני דוד": 270,
  "ישיבת קשת": 10, "ישיבת רמות": 10, "כרם ביבנה": 250, "לב לדעת – שדרות": 100, "מחניים": 100,
  "מכינת אבנר - עכו": 200, "מכינת אורות": 150, "מכינת איתן": 150, "מכינת אלישע": 300,
  "מכינת ארזי הלבנון": 100, "מכינת בית יתיר": 200, "מכינת בני דוד - עלי": 450,
  "מכינת חוסן": 40, "מכינת חמדת": 50, "מכינת ידידיה": 70, "מכינת לפידות - אמונה": 50,
  "מכינת מגן שאול": 100, "מכינת מעלה אפרים": 250, "מכינת מעוז": 30, "מכינת משכיות": 30,
  "מכינת עז שלמה": 30, "מכינת עטרת": 120, "מכינת עצם (עצמונה)": 450, "מכינת קשת יהודה": 400,
  "מכינת רוח השדה": 170, "מכינת שובו אחים": 20, "מכינת תמיר": 50, "מעלה אליהו": 160,
  "מעלה גלבוע": 100, "מעלות": 250, "מצפה יריחו": 160, "מצפה רמון": 300, "מרכז הרב": 600,
  "נהריה": 100, "נווה דקלים": 150, "נטע שורק": 30, "ניר – קרית ארבע": 100, "נצר מטעי – נצרים": 70,
  "נצרת עילית": 50, "נתיבות – אהבת ישראל": 50, "נתיבות דרור – תלם": 20, "נתיבות יוסף": 20,
  "נתיבות ישראל – בת ים": 50, "סוסיא": 17, "עוז ואמונה": 50, "עטרת ירושלים": 180, "עטרת מרדכי": 40,
  "עטרת נחמיה": 47, "עכו": 170, "עתניאל": 300, "צרור המור – בית שאן": 70, "קרית גת": 30,
  "קרית שמונה": 250, "קרני שומרון": 300, "ראשון לציון": 100, "רמלה": 40, "רמת גן": 300,
  "רמת השרון": 60, "רעותא": 20, "שבי חברון": 400, "שדמות נריה": 40, "שיח יצחק – אפרת": 50,
  "שילה": 90, "שעלבים": 100, "תפוח – אבינעם": 140, "תקוע": 35
};

const yeshivotList = [
  "אור וישועה", "אור עציון", "אור עקיבא", "אורות אשקלון", "אורות כרמיאל",
  "אורות נתניה", "אורות שאול", "איילת השחר – אילת", "איתמר", "אפיקי דעת – שדרות",
  "ארץ הצבי – פדואל", "אש התורה", "באר התחיה", "בית אל", "בית המדרש ראש פינה",
  "ברוכין", "ברכת יוסף – אלון מורה", "ברכת משה – מעלה אדומים", "גבעת אולגה",
  "הישיבה הגבוהה בגמזו", "הישיבה הגבוהה בני נצרים", "הר ברכה", "הר המור", "הר עציון",
  "הר שלום – חומש", "חולון", "טפחות", "יפו – שירת משה", "ירוחם", "ישיבת הגולן – חיספין",
  "ישיבת ההסדר דימונה", "ישיבת ההסדר צפת", "ישיבת הכותל", "ישיבת המקדש", "ישיבת חומש המתחדשת",
  "ישיבת מעלה אפרים", "ישיבת עכו", "ישיבת עלי – בני דוד", "ישיבת קשת", "ישיבת רמות", "כרם ביבנה",
  "לב לדעת – שדרות", "מחניים", "מכינת אבנר - עכו", "מכינת אורות", "מכינת איתן", "מכינת אלישע",
  "מכינת ארזי הלבנון", "מכינת בית יתיר", "מכינת עלי - בני דוד", "מכינת חוסן", "מכינת חמדת",
  "מכינת ידידיה", "מכינת יונתן", "מכינת לפידות - אמונה", "מכינת מגן שאול", "מכינת מעוז",
  "מכינת מעלה אפרים", "מכינת משכיות", "מכינת עז שלמה", "מכינת עטרת", "מכינת עצם (עצמונה)",
  "מכינת קשת יהודה", "מכינת רוח השדה", "מכינת שובו אחים", "מכינת תמיר", "מעלה אליהו",
  "מעלה גלבוע", "מעלות", "מצפה יריחו", "מצפה רמון", "מרכז הרב", "נהריה", "נווה דקלים",
  "נטע שורק", "ניר – קרית ארבע", "נצר מטעי – נצרים", "נצרת עילית", "נתיבות – אהבת ישראל",
  "נתיבות דרור – תלם", "נתיבות יוסף", "נתיבות ישראל – בת ים", "סוסיא", "עוז ואמונה",
  "עטרת ירושלים", "עטרת מרדכי", "עטרת נחמיה", "עתניאל", "צרור המור – בית שאן", "קרית גת",
  "קרית שמונה", "קרני שומרון", "ראשון לציון", "רמלה", "רמת גן", "רמת השרון",
  "רעותא", "שבי חברון", "שדמות נריה", "שדרות", "שיח יצחק – אפרת", "שילה",
  "שעלבים", "תפוח – אבינעם", "תקוע"
];

// UI Navigation
window.openStartSection = () => {
  if (beynishStartSection) beynishStartSection.classList.add('hidden');
  if (startSection) startSection.classList.remove('hidden');
};

window.openBeynishStartSection = () => {
  if (startSection) startSection.classList.add('hidden');
  if (beynishStartSection) beynishStartSection.classList.remove('hidden');
};

window.openConceptsSection = () => {
  document.querySelectorAll('.concept').forEach(item => item.classList.remove('active'));
  if (startSection) startSection.classList.add('hidden');
  if (conceptsSection) conceptsSection.classList.remove('hidden');
  if (resultSection) resultSection.classList.add('hidden');
};

window.handleCb = () => {
  const form = document.getElementById("beynish-form");
  if (!form) return;
  const nodes = form.querySelectorAll('input, select');
  const isChecked = cbInput && cbInput.checked;
  nodes.forEach(node => {
    node.disabled = isChecked;
    if (isChecked) node.value = "";
  });
};

function showLoader() {
  if (loaderCircle) loaderCircle.hidden = false;
  if (loaderLine) loaderLine.hidden = false;
  if (loaderClock) loaderClock.hidden = false;
  if (loaderText) loaderText.hidden = false;
  if (darkScreen) darkScreen.hidden = false;
}

function hideLoader() {
  if (loaderCircle) loaderCircle.hidden = true;
  if (loaderLine) loaderLine.hidden = true;
  if (loaderClock) loaderClock.hidden = true;
  if (loaderText) loaderText.hidden = true;
  if (darkScreen) darkScreen.hidden = true;
}

// Concept selection toggle
document.querySelectorAll('.concept').forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('active');
  });
});

// Scoring logic
function getConceptScore(userKnows, bigCount, smallCount, bigKnow, smallKnow, isBig) {
  let ratio = 0;
  if (bigCount === 0 && smallCount === 0) {
    return 0.5;
  }
  if (bigCount === 0) {
    ratio = smallKnow / smallCount;
  } else if (smallCount === 0) {
    ratio = bigKnow / bigCount;
  } else {
    const ratioBig = bigKnow / bigCount;
    const ratioSmall = smallKnow / smallCount;
    ratio = isBig ? (ratioBig * 2 + ratioSmall) / 3 : (ratioBig + ratioSmall * 2) / 3;
  }
  return userKnows ? ratio : (1 - ratio);
}

function getSortedGrades(grades) {
  const sortable = [];
  for (const [institution, grade] of Object.entries(grades)) {
    sortable.push([institution, grade]);
  }
  sortable.sort((a, b) => b[1] - a[1]);
  return sortable;
}

// Fetch all yeshivot documents from Firestore
async function fetchAllYeshivotFromFirestore() {
  try {
    const snapshot = await getDocs(collection(db, "yeshivot"));
    const data = {};
    snapshot.forEach(docSnap => {
      data[docSnap.id] = docSnap.data();
    });
    return data;
  } catch (err) {
    console.error("Error fetching yeshivot from Firestore:", err);
    return {};
  }
}

// Save response to Firestore atomically
async function saveResponseToFirestore(yeshivaName, isBig, activeConceptsMap) {
  if (!yeshivaName || window.localStorage.getItem('shvushon_done')) return;
  window.localStorage.setItem('shvushon_done', '1');

  const field = isBig ? 'gdolim' : 'ktanim';
  const yeshivaRef = doc(db, "yeshivot", yeshivaName);

  const updates = {
    name: yeshivaName,
    [`respondents.${field}`]: increment(1),
    [`respondents.total`]: increment(1)
  };

  for (const [conceptName, knows] of Object.entries(activeConceptsMap)) {
    if (knows) {
      updates[`concepts.${conceptName}.${field}`] = increment(1);
      updates[`concepts.${conceptName}.total`] = increment(1);
    }
  }

  try {
    await setDoc(yeshivaRef, updates, { merge: true });
    console.log("Successfully recorded response to Firestore!");
  } catch (err) {
    console.error("Failed to save response to Firestore:", err);
  }
}

// Main submission handler
window.submitConcepts = async () => {
  if (conceptsSection) conceptsSection.classList.add('hidden');
  showLoader();

  const conceptElements = Array.from(document.querySelectorAll('.concept'));
  const activeConceptsMap = {};
  const terms = [];

  conceptElements.forEach(el => {
    const text = el.innerText.trim();
    const isActive = el.classList.contains('active');
    activeConceptsMap[text] = isActive;
    terms.push(isActive);
  });

  const termsSum = terms.reduce((acc, val) => acc + (val ? 1 : 0), 0);

  // Easter egg / funny messages for all or <3 concepts
  if (termsSum === terms.length || termsSum < 3) {
    hideLoader();
    if (resultSection) resultSection.classList.remove('hidden');
    const resultBox = document.getElementById('result-section');
    if (resultBox) resultBox.hidden = true;

    const smartass = document.getElementById('smartass');
    if (smartass) {
      if (termsSum === terms.length) {
        smartass.innerHTML = 'שמע, אתה יודע הכל. אין לך מה לחפש פה. אולי כדאי לך ללכת לשעשועון "מי רוצה להיות מיליונר", אלא אם אתה לא רוצה להיות מיליונר ואז אולי לא כדאי לך ללכת לשם. אוהבים, החבר\'ה';
      } else {
        smartass.innerHTML = 'שמע, אין לך מה לחפש פה. כדאי לך לנסות לפתוח מידי פעם ויקיפדיה. אתה יודע מה זה ויקיפדיה, נכון? הינה, שמנו לך לינק (קישור) פה: <a href="https://www.wikipedia.org.il">הינה</a>';
      }
    }
    return;
  }

  const allYeshivot = await fetchAllYeshivotFromFirestore();
  const isBig = shioorSelect && shioorSelect.value === "1";
  const grades = {};
  const totalConceptsCount = conceptElements.length || 61;

  for (const [key, instData] of Object.entries(allYeshivot)) {
    const respondents = instData.respondents || {};
    const bigCount = respondents.gdolim || 0;
    const smallCount = respondents.ktanim || 0;

    if (bigCount + smallCount < 8) continue;

    let grade = 0;
    const instConcepts = instData.concepts || {};

    conceptElements.forEach(el => {
      const cName = el.innerText.trim();
      const userKnows = !!activeConceptsMap[cName];
      const conceptStats = instConcepts[cName] || {};
      const cGdolim = conceptStats.gdolim || 0;
      const cKtanim = conceptStats.ktanim || 0;

      grade += getConceptScore(userKnows, bigCount, smallCount, cGdolim, cKtanim, isBig);
    });

    // Dynamic normalization based on actual concept count
    grade = grade * (100 / totalConceptsCount);

    const instSize = ((godel[key] || 50) ** (1 / 3));
    grades[key] = grade + (100 - grade) / (1.428 * instSize + 8) * instSize;
  }

  // Save submission to Firestore if from a yeshiva student
  const studentYeshiva = yeshivaInput ? yeshivaInput.value.trim() : "";
  if (shioorSelect && shioorSelect.value !== "" && studentYeshiva) {
    await saveResponseToFirestore(studentYeshiva, isBig, activeConceptsMap);
  }

  // Rank and display results
  const sorted = getSortedGrades(grades);
  const top3 = [];

  const topCount = Math.min(3, sorted.length);
  for (let i = 0; i < topCount; i++) {
    const item = sorted[i];
    const resEl = document.getElementById('res' + (i + 1));
    if (resEl) {
      const matchPercent = (item[1] + (2 - i) * 4 + Math.random() * 4.5).toFixed(2);
      let text = `#${i + 1} - ${item[0]} (${matchPercent}% התאמה)`;
      if (studentYeshiva === item[0]) {
        text += ' (איזה צירוף מקרים, הא?)';
      }
      resEl.innerHTML = text;
    }
    top3.push(item[0]);
  }

  // Show own yeshiva match if not in top 3
  const percentageEl = document.getElementById('percentage');
  if (percentageEl) {
    if (shioorSelect && shioorSelect.value !== "" && studentYeshiva && (studentYeshiva in grades) && !top3.includes(studentYeshiva)) {
      percentageEl.hidden = false;
      percentageEl.innerHTML = 'אחוזי ההתאמה לישיבתך הקדושה הם: ' + (grades[studentYeshiva]).toFixed(2) + '%';
    } else {
      percentageEl.hidden = true;
    }
  }

  hideLoader();
  if (resultSection) {
    resultSection.classList.remove('hidden');
    const resultBox = document.getElementById('result-section');
    if (resultBox) resultBox.hidden = false;
  }
};

// WhatsApp Sharing
window.sendResultViaWhatsapp = () => {
  let text = 'https://wa.me?text=';
  text += 'עשיתי את שאלון המושגים של שבושון 2 שאומר לי איזו ישיבה או מכינה מתאימה לי ואלה התוצאות שקיבלתי:%0a';
  const r1 = document.getElementById('res1');
  const r2 = document.getElementById('res2');
  const r3 = document.getElementById('res3');
  if (r1) text += r1.innerText.replace('#', '') + '%0a';
  if (r2) text += r2.innerText.replace('#', '') + '%0a';
  if (r3) text += r3.innerText.replace('#', '') + '%0a';
  text += '%0aנסו גם אתם את השאלון בקישור:%0ahttps://shvushon.github.io/shvushon2/';
  if (whatsappLink) whatsappLink.setAttribute('href', text);
};

// Autocomplete
function autocomplete(inp, arr) {
  if (!inp) return;
  let currentFocus = -1;

  inp.addEventListener("input", function() {
    const val = this.value;
    closeAllLists();
    if (!val) return;
    currentFocus = -1;

    const listDiv = document.createElement("div");
    listDiv.setAttribute("id", this.id + "autocomplete-list");
    listDiv.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(listDiv);

    const valUpper = val.toUpperCase();
    for (let i = 0; i < arr.length; i++) {
      const matchIndex = arr[i].toUpperCase().indexOf(valUpper);
      if (matchIndex !== -1) {
        const itemDiv = document.createElement("div");
        itemDiv.innerHTML = arr[i].substring(0, matchIndex) +
          "<strong>" + arr[i].substring(matchIndex, matchIndex + val.length) + "</strong>" +
          arr[i].substring(matchIndex + val.length);
        itemDiv.innerHTML += `<input type='hidden' value='${arr[i]}'>`;

        itemDiv.addEventListener("click", function() {
          inp.value = this.getElementsByTagName("input")[0].value;
          closeAllLists();
        });
        listDiv.appendChild(itemDiv);
      }
    }
  });

  inp.addEventListener("keydown", function(e) {
    let x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode === 40) { // Down
      e.preventDefault();
      currentFocus++;
      addActive(x);
    } else if (e.keyCode === 38) { // Up
      e.preventDefault();
      currentFocus--;
      addActive(x);
    } else if (e.keyCode === 13) { // Enter
      e.preventDefault();
      if (currentFocus > -1 && x && x[currentFocus]) {
        x[currentFocus].click();
      }
    }
  });

  function addActive(items) {
    if (!items || items.length === 0) return;
    removeActive(items);
    if (currentFocus >= items.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = items.length - 1;
    items[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(items) {
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    const items = document.getElementsByClassName("autocomplete-items");
    for (let i = items.length - 1; i >= 0; i--) {
      if (elmnt !== items[i] && elmnt !== inp) {
        items[i].parentNode.removeChild(items[i]);
      }
    }
  }

  document.addEventListener("click", function(e) {
    closeAllLists(e.target);
  });
}

autocomplete(yeshivaInput, yeshivotList);

// Form Validation
window.validateForm = () => {
  const isCbChecked = cbInput && cbInput.checked;
  const isYeshivaValid = yeshivaInput && yeshivotList.includes(yeshivaInput.value.trim());
  const isShioorSelected = shioorSelect && shioorSelect.value !== "";

  if (isCbChecked || (isYeshivaValid && isShioorSelected)) {
    window.openConceptsSection();
  }
};