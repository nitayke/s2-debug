// Varibles
const startSection = document.querySelector('.start-section');
const conceptsSection = document.querySelector('.concepts-section');
const resultSection = document.querySelector('.result-section');

//hide sections before load
// startSection.classList.add('hidden');
conceptsSection.classList.add('hidden');
resultSection.classList.add('hidden');



//functions

//open concepts section
const openConceptsSection = () => {
  startSection.classList.add('hidden');
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
const submitConcepts = () => {
  conceptsSection.classList.add('hidden');
  resultSection.classList.remove('hidden');

}