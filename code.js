const MAX_REPONSES = 300

// Varibles
const startSection = document.querySelector('.start-section');
const beynishStartSection = document.querySelector('.beynish-start-section');
const conceptsSection = document.querySelector('.concepts-section');
const resultSection = document.querySelector('.result-section');
const yeshiva = document.getElementById('autocomplete-input')
const shioor = document.getElementById('shioor')

//hide sections before load
// startSection.classList.add('hidden');
beynishStartSection.classList.add('hidden');
conceptsSection.classList.add('hidden');
resultSection.classList.add('hidden');

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


//functions

window.openStartSection = () => {
  beynishStartSection.classList.add('hidden');
  startSection.classList.remove('hidden');
}

window.openBeynishStartSection = () => {
  startSection.classList.add('hidden');
  beynishStartSection.classList.remove('hidden');
}

window.openConceptsSection = () => {
  startSection.classList.add('hidden');
  beynishStartSection.classList.add('hidden');
  conceptsSection.classList.remove('hidden');
  resultSection.classList.add('hidden');
}


//choose concepts on click
document.querySelectorAll('.concept').forEach(item => {
    item.addEventListener('click', event => {
      item.classList.toggle('active')
    })
  })
  

//submit concepts on click
window.submitConcepts = async () => {
  conceptsSection.classList.add('hidden');

  // TODO: add loader

  var terms = [];
  
  document.querySelectorAll('.concept').forEach(item => {
    terms.push(item.classList.contains('active'));
  })

  if (shioor.value != "") // change DB
  {
    // 1 if "0", MAX_RESPONSES if "1"
    var duplicate = (shioor.value == "1") * (MAX_REPONSES - 1) + 1;
    var res;
    const qRef = ref(getDatabase(), yeshiva.value);
    const snapshot = await get(qRef);
    if (snapshot.exists())
    {
      res = snapshot.val();
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

    set(qRef, res);
  }
  

  resultSection.classList.remove('hidden');


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
      currentFocus = -1;
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
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
    inp.value = x[currentFocus].innerText;
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
      "ישיבת מעלה אפרים", "ישיבת עכו", "ישיבת עלי – בני דוד", "ישיבת קשת", "ישיבת רמות",
       "כרם ביבנה", "לב לדעת – שדרות", "מחניים", "מכינת אבנר - עכו", "מכינת אורות", "מכינת איתן",
        "מכינת אלישע", "מכינת ארזי הלבנון", "מכינת בית יתיר", "מכינת בני דוד - עלי", "מכינת חוסן",
          "מכינת חמדת", "מכינת ידידיה", "מכינת יונתן", "מכינת לפידות - אמונה", "מכינת מגן שאול",
           "מכינת מעוז", "מכינת מעלה אפרים", "מכינת משכיות", "מכינת עז שלמה", "מכינת עטרת",
            "מכינת עצם (עצמונה)", "מכינת קשת יהודה", "מכינת רוח השדה", "מכינת שובו אחים",
             "מכינת תמיר", "מעלה אליהו", "מעלה גלבוע", "מעלות", "מצפה יריחו", "מצפה רמון",
              "מרכז הרב", "נהריה", "נווה דקלים", "נטע שורק", "ניר – קרית ארבע", "נצר מטעי – נצרים",
               "נצרת עילית", "נתיבות – אהבת ישראל", "נתיבות דרור – תלם", "נתיבות יוסף",
                "נתיבות ישראל – בת ים", "סוסיא", "עוז ואמונה", "עטרת ירושלים", "עטרת מרדכי",
                 "עטרת נחמיה", "עתניאל", "צרור המור – בית שאן", "קרית גת", "קרית שמונה",
                  "קרני שומרון", "ראשון לציון", "רוח השדה", "רמלה", "רמת גן", "רמת השרון",
                   "רעותא", "שבי חברון", "שדמות נריה", "שדרות", "שיח יצחק – אפרת", "שילה",
                    "שעלבים", "תפוח – אבינעם", "תקוע"];
autocomplete(document.getElementById("autocomplete-input"), yeshivot);

//Beynish Form Validation

window.validateForm = () => {
  if(yeshivot.includes(yeshiva.value) && shioor.value != ""){
    openConceptsSection();
  }
}
