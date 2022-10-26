const MAX_REPONSES = 300

// Varibles
const startSection = document.querySelector('.start-section');
const beynishStartSection = document.querySelector('.beynish-start-section');
const conceptsSection = document.querySelector('.concepts-section');
const resultSection = document.querySelector('.result-section');
const yeshiva = document.getElementById('autocomplete-input')
const shioor = document.getElementById('shioor')

const loaderCircle = document.querySelector(".loader-circle");
const loaderLine = document.querySelector(".loader-line");
const loaderClock = document.querySelector(".loader-clock");
const loaderText = document.querySelector(".loader-text");
const darkScreen = document.querySelector(".dark-screen");

const whatsappLink = document.querySelector('.whatsapp-link');
let whatsappLinkText;

//hide sections before load
// startSection.classList.add('hidden');
beynishStartSection.classList.add('hidden');
conceptsSection.classList.add('hidden');
resultSection.classList.add('hidden');
// showLoader();

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-analytics.js";

import {
  getDatabase,
  ref,
  set,
  get,
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-database.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAm7hTWEmt1JRX3JXpq_dDNQWo0KKKC008",
  authDomain: "shvushon2.firebaseapp.com",
  databaseURL: "https://shvushon2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "shvushon2",
  storageBucket: "shvushon2.appspot.com",
  messagingSenderId: "833572668563",
  appId: "1:833572668563:web:efd646d875de094f203966",
  measurementId: "G-VTT9E38KE8"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);



// Functions

window.openStartSection = () => {
  beynishStartSection.classList.add('hidden');
  startSection.classList.remove('hidden');
}

window.openBeynishStartSection = () => {
  startSection.classList.add('hidden');
  beynishStartSection.classList.remove('hidden');
}

window.openConceptsSection = () => {
  document.querySelectorAll('.concept').forEach(item => item.classList.remove('active'))
  startSection.classList.add('hidden');
  beynishStartSection.classList.add('hidden');
  conceptsSection.classList.remove('hidden');
  resultSection.classList.add('hidden');
}

function showLoader() {
  loaderCircle.hidden = false;
  loaderLine.hidden = false;
  loaderClock.hidden = false;
  loaderText.hidden = false;
  darkScreen.hidden = false;
}

function hideLoader() {
  loaderCircle.hidden = true;
  loaderLine.hidden = true;
  loaderClock.hidden = true;
  loaderText.hidden = true;
  darkScreen.hidden = true;
}


//choose concepts on click
document.querySelectorAll('.concept').forEach(item => {
    item.addEventListener('click', event => {
      item.classList.toggle('active')
    })
  })
  

const godel = {"אור וישועה": 60, "אור עציון": 160, "אור עקיבא": 20, "אורות אשקלון": 20,
  "אורות כרמיאל": 30, "אורות נתניה": 50, "אורות שאול": 160, "איילת השחר – אילת": 120,
  "איתמר": 150, "אפיקי דעת – שדרות": 500, "ארץ הצבי – פדואל": 20, "אש התורה": 20, "באר התחיה": 10,
  "בית אל": 300, "בית המדרש ראש פינה": 10, "ברוכין": 160, "ברכת יוסף – אלון מורה": 130,
  "ברכת משה – מעלה אדומים": 200, "גבעת אולגה": 230, "הישיבה הגבוהה בגמזו": 10,
  "הישיבה הגבוהה בני נצרים": 20, "הר ברכה": 110, "הר המור": 600, "הר עציון": 350,
  "הר שלום – חומש": 10, "חולון": 35, "טפחות": 110, "יפו – שירת משה": 140, "ירוחם": 250,
  "ישיבת הגולן – חיספין": 150, "ישיבת ההסדר דימונה": 70, "ישיבת ההסדר צפת": 135,
  "ישיבת הכותל": 350, "ישיבת המקדש": 13, "ישיבת חומש המתחדשת": 10, "ישיבת עלי – בני דוד": 270,
  "ישיבת קשת": 10, "ישיבת רמות": 10, "כרם ביבנה": 350, "לב לדעת – שדרות": 100, "מחניים": 100,
  "מכינת אבנר - עכו": 200, "מכינת אורות": 150, "מכינת איתן": 150, "מכינת אלישע": 300,
  "מכינת ארזי הלבנון": 100, "מכינת בית יתיר": 200, "מכינת בני דוד - עלי": 450,
  "מכינת חוסן": 40, "מכינת חמדת": 50, "מכינת ידידיה": 70, "מכינת לפידות - אמונה": 50,
  "מכינת מגן שאול": 100, "מכינת מעלה אפרים": 250, "מכינת מעוז": 30, "מכינת משכיות": 30,
  "מכינת עז שלמה": 30, "מכינת עטרת": 120, "מכינת עצם (עצמונה)": 470, "מכינת קשת יהודה": 400,
  "מכינת רוח השדה": 250, "מכינת שובו אחים": 20, "מכינת תמיר": 50, "מעלה אליהו": 160,
  "מעלה גלבוע": 120, "מעלות": 200, "מצפה יריחו": 200, "מצפה רמון": 300, "מרכז הרב": 550,
  "נהריה": 100, "נווה דקלים": 150, "נטע שורק": 30, "ניר – קרית ארבע": 100, "נצר מטעי – נצרים": 70,
  "נצרת עילית": 50, "נתיבות – אהבת ישראל": 50, "נתיבות דרור – תלם": 20, "נתיבות יוסף": 20,
  "נתיבות ישראל – בת ים": 50, "סוסיא": 17, "עוז ואמונה": 50, "עטרת ירושלים": 180, "עטרת מרדכי": 40,
  "עטרת נחמיה": 47, "עכו": 170, "עתניאל": 300, "צרור המור – בית שאן": 70, "קרית גת": 30,
  "קרית שמונה": 200, "קרני שומרון": 300, "ראשון לציון": 100, "רמלה": 40, "רמת גן": 300,
  "רמת השרון": 60, "רעותא": 20, "שבי חברון": 400, "שדמות נריה": 40, "שיח יצחק – אפרת": 50,
  "שילה": 90, "שעלבים": 100, "תפוח – אבינעם": 140, "תקוע": 35}

function get_tmp_grade(term, big_count, small_count, big_know, small_know, is_big)
{
  // if there are only small responses, we use only them,
  // it doesn't matter if he's big or small
  if (big_count === 0)
  {
    if (term)
      return small_know/small_count
    else
      return 1 - small_know/small_count
  }
  // איך אומרים, העדפתי שזה יהיה קריא מאשר שזה יהיה קצר
  else if (small_count === 0)
  {
    if (term)
      return big_know/big_count
    else
      return 1 - big_know/big_count
  }
  else if (is_big)
  {
    if (term)
      return ((big_know/big_count) * 2 + (small_know/small_count)) / 3;
    else
      return ((1 - big_know/big_count) * 2 + (1 - small_know/small_count)) / 3;
  }
  else
  {
    if (term)
      return ((big_know/big_count) + (small_know/small_count) * 2) / 3;
    else
      return ((1 - big_know/big_count) + (1 - small_know/small_count) * 2) / 3;
  }
}

function get_sorted(grades)
{
  let sortable = [];
  for (var grade in grades) {
      sortable.push([grade, grades[grade]]);
  }

  sortable.sort(function(a, b) {
      return b[1] - a[1];
  });
  return sortable;
}

// All the DB things are here
window.submitConcepts = async () => {
  conceptsSection.classList.add('hidden');

  showLoader();

  var terms = [];
  
  document.querySelectorAll('.concept').forEach(item => {
    terms.push(item.classList.contains('active'));
  })

  var grades = {};

  var qRef = ref(getDatabase());
  var snapshot = await get(qRef);
  var val = snapshot.val();
  var musagim_length;

  for (var key in val) // in yeshivot
  {
    var musag = val[key][0];
    var big_count = musag % MAX_REPONSES;
    var small_count = Math.floor(musag / MAX_REPONSES);
    if (small_count+big_count < 5)
      continue;
    const is_big = shioor.value === "1";
    var grade = 0;
    musagim_length = val[key].length - 1;

    for (var i = 1; i < musagim_length + 1; i++) // musagim
    {
      musag = val[key][i]
    
      grade += get_tmp_grade(terms[i-1], big_count, small_count, musag % MAX_REPONSES,
        Math.floor(musag / MAX_REPONSES), is_big);      
    }
    const updated_grade = grade * (100/(musagim_length));
    const size = godel[key];
    grades[key] = (updated_grade + ((100 - updated_grade) / ((1.428*size**(1/3) + 8))) * (size**(1/3))).toFixed(2);
  }


  if (shioor.value != "" && !window.localStorage.getItem('done')) // change DB.
  {
    console.log('changing DB...');
    window.localStorage.setItem('done', 1);

    // 1 if "1", MAX_RESPONSES if "0" (I guess there will be more ktanim than gdolim)
    var duplicate = (shioor.value == "0") * (MAX_REPONSES - 1) + 1;
    var res;
    if (val !== null && yeshiva.value in val)
    {
      res = val[yeshiva.value];
      res[0] += duplicate;
      for (var i = 1; i < res.length; i++)
      {
        res[i] += (terms[i - 1] * duplicate);
      }
    }
    else
    {
      // first element is count of answers
      res = [duplicate].concat(terms.map(x => x * duplicate));
    }

    qRef = ref(getDatabase(), yeshiva.value);
    set(qRef, res);
  }

  const sortable = get_sorted(grades);
  
  for (var i = 0; i < 3; i++)
  {
    // TODO: delete this after we have DB
    if (sortable[i] === undefined)
      break;
    document.getElementById('res' + (i+1)).innerHTML = `#${i+1} - ${sortable[i][0]} (${sortable[i][1]}% התאמה)`
  }
  
  // show percentage for his yeshiva
  if (shioor.value !== "")
  {
    const percentage = document.getElementById('percentage');
    percentage.hidden = false;
    percentage.innerHTML += grades[shioor.value] + '%';
  }

  hideLoader();
  resultSection.classList.remove('hidden');
}

window.sendResultViaWhatsapp = () => {
  whatsappLinkText = 'https://wa.me?text='
  whatsappLinkText += 'עשיתי את שאלון המושגים של שבושון 2 שאומר לי איזו ישיבה או מכינה מתאימה לי ואלה התוצאות שקיבלתי:'
  whatsappLinkText += '%0a'
  whatsappLinkText += document.getElementById('res1').innerText.replace('#', '');
  whatsappLinkText += '%0a'
  whatsappLinkText += document.getElementById('res2').innerText.replace('#', '');
  whatsappLinkText += '%0a'
  whatsappLinkText += document.getElementById('res3').innerText.replace('#', '');
  whatsappLinkText += '%0a'
  whatsappLinkText += '%0a'
  whatsappLinkText += 'נסו גם אתם את השאלון בקישור:'
  whatsappLinkText += '%0a'
  whatsappLinkText += 'https://nitayke.github.io/shvushon2-debug/'
  whatsappLink.setAttribute('href', whatsappLinkText)
  console.log(whatsappLinkText)
}

//Yeshivot autocomplete
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, bold, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = 0;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].toUpperCase().includes(val.toUpperCase())) {
          bold = getIncludeLetters(arr[i].toUpperCase(), val.toUpperCase());
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = arr[i].substr(0, bold)
          b.innerHTML += "<strong>" + arr[i].substr(bold, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(parseInt(bold) + parseInt(val.length));
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
            /*insert the value for the autocomplete text field:*/
            inp.value = this.getElementsByTagName("input")[0].value;
            /*close the list of autocompleted values,
            (or any other open lists of autocompleted values:*/
            closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        e.preventDefault();
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        e.preventDefault();
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > 0) {
 /*and simulate a click on the "active" item:*/
 if (x) x[currentFocus-1].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus - 1 >= x.length) currentFocus = 1;
    if (currentFocus < 1) currentFocus = (x.length -1);
    /*add class "autocomplete-active":*/
    x[currentFocus-1].classList.add("autocomplete-active");
    inp.value = x[currentFocus-1].innerText;
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}

function getIncludeLetters(str, s) {
  for (var i = 0; i < str.length - s.length + 1; i++) {
    if (str.substring(i, s.length + i) == s) {
      return i + " ";
    }
  }

  return 0;
}

let yeshivot = ["אור וישועה", "אור עציון", "אור עקיבא", "אורות אשקלון", "אורות כרמיאל",
  "אורות נתניה", "אורות שאול", "איילת השחר – אילת", "איתמר", "אפיקי דעת – שדרות",
  "ארץ הצבי – פדואל", "אש התורה", "באר התחיה", "בית אל", "בית המדרש ראש פינה",
  "ברוכין", "ברכת יוסף – אלון מורה", "ברכת משה – מעלה אדומים", "גבעת אולגה",
  "הישיבה הגבוהה בגמזו", "הישיבה הגבוהה בני נצרים", "הר ברכה", "הר המור", "הר עציון",
  "הר שלום – חומש", "חולון", "טפחות", "יפו – שירת משה", "ירוחם", "ישיבת הגולן – חיספין",
  "ישיבת ההסדר דימונה", "ישיבת ההסדר צפת", "ישיבת הכותל", "ישיבת המקדש", "ישיבת חומש המתחדשת",
  "ישיבת מעלה אפרים", "ישיבת עכו", "ישיבת עלי – בני דוד", "ישיבת קשת", "ישיבת רמות", "כרם ביבנה",
  "לב לדעת – שדרות", "מחניים", "מכינת אבנר - עכו", "מכינת אורות", "מכינת איתן", "מכינת אלישע",
  "מכינת ארזי הלבנון", "מכינת בית יתיר", "מכינת בני דוד - עלי", "מכינת חוסן", "מכינת חמדת",
  "מכינת ידידיה", "מכינת יונתן", "מכינת לפידות - אמונה", "מכינת מגן שאול", "מכינת מעוז",
  "מכינת מעלה אפרים", "מכינת משכיות", "מכינת עז שלמה", "מכינת עטרת", "מכינת עצם (עצמונה)",
  "מכינת קשת יהודה", "מכינת רוח השדה", "מכינת שובו אחים", "מכינת תמיר", "מעלה אליהו",
  "מעלה גלבוע", "מעלות", "מצפה יריחו", "מצפה רמון", "מרכז הרב", "נהריה", "נווה דקלים",
  "נטע שורק", "ניר – קרית ארבע", "נצר מטעי – נצרים", "נצרת עילית", "נתיבות – אהבת ישראל",
  "נתיבות דרור – תלם", "נתיבות יוסף", "נתיבות ישראל – בת ים", "סוסיא", "עוז ואמונה",
  "עטרת ירושלים", "עטרת מרדכי", "עטרת נחמיה", "עתניאל", "צרור המור – בית שאן", "קרית גת",
  "קרית שמונה", "קרני שומרון", "ראשון לציון", "רוח השדה", "רמלה", "רמת גן", "רמת השרון",
  "רעותא", "שבי חברון", "שדמות נריה", "שדרות", "שיח יצחק – אפרת", "שילה",
  "שעלבים", "תפוח – אבינעם", "תקוע"];
autocomplete(document.getElementById("autocomplete-input"), yeshivot);

//Beynish Form Validation

window.validateForm = () => {
  if(yeshivot.includes(yeshiva.value) && shioor.value != ""){
    openConceptsSection();
  }
}
