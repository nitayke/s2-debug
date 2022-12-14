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
  conceptsSection.classList.remove('hidden');
  resultSection.classList.add('hidden');
}

window.handleCb = () => {
  if (document.getElementById('cb').checked)
  {
    var nodes = document.getElementById("beynish-form").getElementsByTagName('*');
    for(var i = 0; i < nodes.length; i++) {
        nodes[i].disabled = true;
        nodes[i].value = "";
    }
  }
  else
  {
    var nodes = document.getElementById("beynish-form").getElementsByTagName('*');
    for(var i = 0; i < nodes.length; i++){
        nodes[i].disabled = false;
    }
  }
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
  

const godel = {"?????? ????????????": 60, "?????? ??????????": 160, "?????? ??????????": 20, "?????????? ????????????": 20,
  "?????????? ????????????": 30, "?????????? ??????????": 50, "?????????? ????????": 160, "?????????? ???????? ??? ????????": 120,
  "??????????": 150, "?????????? ?????? ??? ??????????": 500, "?????? ???????? ??? ??????????": 20, "???? ??????????": 20, "?????? ??????????": 10,
  "?????? ????": 300, "?????? ?????????? ?????? ????????": 10, "????????????": 160, "???????? ???????? ??? ???????? ????????": 130,
  "???????? ?????? ??? ???????? ????????????": 200, "???????? ??????????": 230, "???????????? ???????????? ??????????": 10,
  "???????????? ???????????? ?????? ??????????": 20, "???? ????????": 110, "???? ????????": 600, "???? ??????????": 350,
  "???? ???????? ??? ????????": 10, "??????????": 35, "??????????": 110, "?????? ??? ???????? ??????": 140, "??????????": 250,
  "?????????? ?????????? ??? ????????????": 150, "?????????? ?????????? ????????????": 70, "?????????? ?????????? ??????": 135,
  "?????????? ??????????": 350, "?????????? ??????????": 13, "?????????? ???????? ??????????????": 10, "?????????? ?????? ??? ?????? ??????": 270,
  "?????????? ??????": 10, "?????????? ????????": 10, "?????? ??????????": 250, "???? ???????? ??? ??????????": 100, "????????????": 100,
  "?????????? ???????? - ??????": 200, "?????????? ??????????": 150, "?????????? ????????": 150, "?????????? ??????????": 300,
  "?????????? ???????? ????????????": 100, "?????????? ?????? ????????": 200, "?????????? ?????? ?????? - ??????": 450,
  "?????????? ????????": 40, "?????????? ????????": 50, "?????????? ????????????": 70, "?????????? ???????????? - ??????????": 50,
  "?????????? ?????? ????????": 100, "?????????? ???????? ??????????": 250, "?????????? ????????": 30, "?????????? ????????????": 30,
  "?????????? ???? ????????": 30, "?????????? ????????": 120, "?????????? ?????? (????????????)": 450, "?????????? ?????? ??????????": 400,
  "?????????? ?????? ????????": 170, "?????????? ???????? ????????": 20, "?????????? ????????": 50, "???????? ??????????": 160,
  "???????? ??????????": 100, "??????????": 250, "???????? ??????????": 160, "???????? ????????": 300, "???????? ??????": 600,
  "??????????": 100, "???????? ??????????": 150, "?????? ????????": 30, "?????? ??? ???????? ????????": 100, "?????? ???????? ??? ??????????": 70,
  "???????? ??????????": 50, "???????????? ??? ???????? ??????????": 50, "???????????? ???????? ??? ??????": 20, "???????????? ????????": 20,
  "???????????? ?????????? ??? ???? ????": 50, "??????????": 17, "?????? ????????????": 50, "???????? ??????????????": 180, "???????? ??????????": 40,
  "???????? ??????????": 47, "??????": 170, "????????????": 300, "???????? ???????? ??? ?????? ??????": 70, "???????? ????": 30,
  "???????? ??????????": 250, "???????? ????????????": 300, "?????????? ??????????": 100, "????????": 40, "?????? ????": 300,
  "?????? ??????????": 60, "??????????": 20, "?????? ??????????": 400, "?????????? ????????": 40, "?????? ???????? ??? ????????": 50,
  "????????": 90, "????????????": 100, "???????? ??? ????????????": 140, "????????": 35}

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
  else if (small_count === 0)
  {
    if (term)
      return big_know/big_count
    else
      return 1 - big_know/big_count
  }
  // ?????? ????????????, ???????????? ?????? ???????? ???????? ???????? ?????? ???????? ??????
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

  const terms_sum = terms.reduce((partialSum, a) => partialSum + a, 0);
  if (terms_sum === terms.length || terms_sum < 3)
  {
    hideLoader();
    resultSection.classList.remove('hidden');
    document.getElementById('result-section').hidden = true;
    if (terms_sum === terms.length)
      document.getElementById('smartass').innerHTML = '??????, ?????? ???????? ??????. ?????? ???? ???? ???????? ????. ???????? ???????? ???? ???????? ???????????????? "???? ???????? ?????????? ??????????????", ?????? ???? ?????? ???? ???????? ?????????? ?????????????? ?????? ???????? ???? ???????? ???? ???????? ??????. ????????????, ????????\'??';
    else
      document.getElementById('smartass').innerHTML = '??????, ?????? ???? ???? ???????? ????. ???????? ???? ?????????? ?????????? ???????? ?????? ????????????????. ?????? ???????? ???? ???? ????????????????, ????????? ????????, ???????? ???? ???????? (??????????) ????: <a href="https://www.wikipedia.org.il">????????</a>';
  }

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
    if (small_count+big_count < 8)
      continue;
    const is_big = shioor.value === "1";
    var grade = 0;
    musagim_length = val[key].length - 1;

    for (var i = 1; i < musagim_length + 1; i++) // musagim
    {
      musag = val[key][i];
    
      grade += get_tmp_grade(terms[i-1], big_count, small_count, musag % MAX_REPONSES,
        Math.floor(musag / MAX_REPONSES), is_big);
    }
    const size = godel[key] ** (1/3);
    grade = grade * (100/64);

    grades[key] = grade + (100 - grade) / (1.428 * size + 8) * size;
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
  const top3 = [];
  
  for (var i = 0; i < 3; i++)
  {
    document.getElementById('res' + (i+1)).innerHTML =
     `#${i+1} - ${sortable[i][0]} (${(sortable[i][1] + (2-i) * 4 + Math.random() * 4.5).toFixed(2)}% ??????????)`;
    if (yeshiva.value === sortable[i][0])
      document.getElementById('res' + (i+1)).innerHTML += ' (???????? ?????????? ??????????, ?????)'
    top3.push(sortable[i][0]);
  }
  // show percentage for his yeshiva
  if (shioor.value !== "" && yeshiva.value in grades && ! (top3.includes(yeshiva.value)))
  {
    const percentage = document.getElementById('percentage');
    percentage.hidden = false;
    percentage.innerHTML += (grades[yeshiva.value]).toFixed(2) + '%';
  }

  hideLoader();
  resultSection.classList.remove('hidden');
}

window.sendResultViaWhatsapp = () => {
  whatsappLinkText = 'https://wa.me?text='
  whatsappLinkText += '?????????? ???? ?????????? ?????????????? ???? ???????????? 2 ?????????? ???? ???????? ?????????? ???? ?????????? ???????????? ???? ???????? ?????????????? ??????????????:'
  whatsappLinkText += '%0a'
  whatsappLinkText += document.getElementById('res1').innerText.replace('#', '');
  whatsappLinkText += '%0a'
  whatsappLinkText += document.getElementById('res2').innerText.replace('#', '');
  whatsappLinkText += '%0a'
  whatsappLinkText += document.getElementById('res3').innerText.replace('#', '');
  whatsappLinkText += '%0a'
  whatsappLinkText += '%0a'
  whatsappLinkText += '?????? ???? ?????? ???? ???????????? ????????????:'
  whatsappLinkText += '%0a'
  whatsappLinkText += 'https://shvushon.github.io/shvushon2/'
  whatsappLink.setAttribute('href', whatsappLinkText)
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

let yeshivot = ["?????? ????????????", "?????? ??????????", "?????? ??????????", "?????????? ????????????", "?????????? ????????????",
  "?????????? ??????????", "?????????? ????????", "?????????? ???????? ??? ????????", "??????????", "?????????? ?????? ??? ??????????",
  "?????? ???????? ??? ??????????", "???? ??????????", "?????? ??????????", "?????? ????", "?????? ?????????? ?????? ????????",
  "????????????", "???????? ???????? ??? ???????? ????????", "???????? ?????? ??? ???????? ????????????", "???????? ??????????",
  "???????????? ???????????? ??????????", "???????????? ???????????? ?????? ??????????", "???? ????????", "???? ????????", "???? ??????????",
  "???? ???????? ??? ????????", "??????????", "??????????", "?????? ??? ???????? ??????", "??????????", "?????????? ?????????? ??? ????????????",
  "?????????? ?????????? ????????????", "?????????? ?????????? ??????", "?????????? ??????????", "?????????? ??????????", "?????????? ???????? ??????????????",
  "?????????? ???????? ??????????", "?????????? ??????", "?????????? ?????? ??? ?????? ??????", "?????????? ??????", "?????????? ????????", "?????? ??????????",
  "???? ???????? ??? ??????????", "????????????", "?????????? ???????? - ??????", "?????????? ??????????", "?????????? ????????", "?????????? ??????????",
  "?????????? ???????? ????????????", "?????????? ?????? ????????", "?????????? ?????? - ?????? ??????", "?????????? ????????", "?????????? ????????",
  "?????????? ????????????", "?????????? ??????????", "?????????? ???????????? - ??????????", "?????????? ?????? ????????", "?????????? ????????",
  "?????????? ???????? ??????????", "?????????? ????????????", "?????????? ???? ????????", "?????????? ????????", "?????????? ?????? (????????????)",
  "?????????? ?????? ??????????", "?????????? ?????? ????????", "?????????? ???????? ????????", "?????????? ????????", "???????? ??????????",
  "???????? ??????????", "??????????", "???????? ??????????", "???????? ????????", "???????? ??????", "??????????", "???????? ??????????",
  "?????? ????????", "?????? ??? ???????? ????????", "?????? ???????? ??? ??????????", "???????? ??????????", "???????????? ??? ???????? ??????????",
  "???????????? ???????? ??? ??????", "???????????? ????????", "???????????? ?????????? ??? ???? ????", "??????????", "?????? ????????????",
  "???????? ??????????????", "???????? ??????????", "???????? ??????????", "????????????", "???????? ???????? ??? ?????? ??????", "???????? ????",
  "???????? ??????????", "???????? ????????????", "?????????? ??????????", "????????", "?????? ????", "?????? ??????????",
  "??????????", "?????? ??????????", "?????????? ????????", "??????????", "?????? ???????? ??? ????????", "????????",
  "????????????", "???????? ??? ????????????", "????????"];
autocomplete(document.getElementById("autocomplete-input"), yeshivot);

// Beynish Form Validation

window.validateForm = () => {
  if (document.getElementById('cb').checked)
  {
    var nodes = document.getElementById("beynish-form").getElementsByTagName('*');
    for(var i = 0; i < nodes.length; i++) {
        nodes[i].disabled = true;
        nodes[i].value = "";
    }
  }
  if(yeshivot.includes(yeshiva.value) && shioor.value != "" ||
   document.getElementById('cb').checked) {
    openConceptsSection();
  }  
}