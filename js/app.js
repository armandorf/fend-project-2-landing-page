/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/*
 * Global Variables
 */
const NUMBER_SEARCH_REGEX = /\d+/;
const DEFAULT_NUMBER_OF_SECTIONS_TO_CREATE = 4;
const SCROLL_TO_TOP_PAGE_Y_OFFSET = 50;


/*
 * Helper Functions
 */

/**
 * Extracts the number that indicates section order from its id value
 * when such number is at the end of the string.
 * @param section HTMLElement object
 * @returns {number}
 */
function extractIdNum(section) {
  const numAtEndIndex = section.id.search(NUMBER_SEARCH_REGEX);
  return parseInt(section.id.substring(numAtEndIndex), 10);
}

/**
 * Returns all sections as an array of elements.
 * @returns {*[]}
 */
function getAllSectionsAsArray() {
  return [...document.getElementsByTagName('section')];
}

/**
 * Handles the action when an anchor is clicked.
 * Scrolls to anchor id smoothly and toggles class 'active' on the
 * target element.
 * @param e
 */
function handleAnchorClick(e) {
  e.preventDefault();
  if (e.target.nodeName.toLowerCase() === 'a') {
    // set smooth scrolling
    const targetSection = document.querySelector(e.target.getAttribute('href'));
    targetSection.scrollIntoView({
      behavior: 'smooth',
    });

    // toggle class 'active'
    const currActiveSection = document.getElementsByClassName('active').item(0);
    currActiveSection.classList.remove('active');
    targetSection.classList.add('active');
  }
}

/**
 * Builds the navigation efficiently menu by using a document fragment.
 * It also adds a single event listener to the ul element to handle clicks on
 * the anchors.
 */
function buildNavMenu() {
  // create a list menu item for each section
  const navList = document.getElementById('navbar__list');
  const navListDocFragment = document.createDocumentFragment();
  const sections = getAllSectionsAsArray();
  sections.forEach((section) => {
    // create elements
    const listItem = document.createElement('li');
    const listAnchor = document.createElement('a');
    listAnchor.setAttribute('href', `#${section.id}`);
    listAnchor.classList.add('menu__link');
    listAnchor.textContent = section.querySelector('div.landing__container h2').textContent;

    listItem.appendChild(listAnchor);
    navListDocFragment.appendChild(listItem);
  });
  navList.appendChild(navListDocFragment);

  // add event listeners using the bubbling phase
  navList.addEventListener('click', handleAnchorClick);
}

/**
 * Creates a given number of sections. It clones the last existing one and adds n
 * more sections to the page in order.
 * @param numberOfNewSections
 */
function createNSections(numberOfNewSections = DEFAULT_NUMBER_OF_SECTIONS_TO_CREATE) {
  // create 4 new sections
  const sections = getAllSectionsAsArray();
  const lastSection = sections[sections.length - 1];
  const lastNum = extractIdNum(lastSection);

  // clone 4 sections from lastSection
  const sectionsDocFragment = document.createDocumentFragment();
  for (let i = lastNum + 1; i <= lastNum + numberOfNewSections; i += 1) {
    const clonedNode = lastSection.cloneNode(true);
    // update id value
    clonedNode.id = `section${i}`;
    // update h2 text content
    clonedNode.querySelector('div.landing__container h2').textContent = `Section ${i}`;
    sectionsDocFragment.appendChild(clonedNode);
  }
  document.querySelector('main').appendChild(sectionsDocFragment);
}



// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click

// Set sections as active
