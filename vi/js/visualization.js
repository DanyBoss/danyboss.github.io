
// global variables
var selectedNode = null,
    currentLevel = 1,   // defines the deepness we're seeing in the vis (Sport = 1; Discipline = 2; Event = 3)
    countryFilter = "USA",
    sportFilter = "All",
    disciplineFilter = "All",
    eventFilter = "All",
    initialYearFilter = 1896,
    endYearFilter = 2012,
    currentFilterKeyword = "Sport";

// colors used throughout the visualization
var color = d3.scaleOrdinal(d3.schemeSet3),
    colorAlt = d3.scaleOrdinal(d3.schemeCategory20);

// years in which olympics occored
var years = [1896, 1900, 1904, 1908, 1912, 1920, 1924, 1928, 1932, 1936, 1948, 1952, 1956, 1960, 1964, 1968, 1972, 1976, 1980, 1984, 1988, 1992, 1996, 2000, 2004, 2008, 2012]

//set a reload function on window resize
window.onresize = function(){ location.reload(); }

// call first vis drawing
$(document).ready(function() {
    genTimeSlider();
    genBubblechart(false, -1);
    genLinechart();
});

// AUXILIARY FUNCTIONS //

//function assumes we never use a year outside of year array
function checkIfYearInInterval(year){
    return (year >= initialYearFilter && year <= endYearFilter);
};

//function to get a CSS variable from the CSS
function getCSSColor(variable){
    return getComputedStyle(document.body).getPropertyValue(variable);
};

// descending filter compararation function
function descending(a,b) { return a.key - b.key };

function changeCountry(country){
    countryFilter = String(country);

    genBubblechart(true, 0);
    updateLinechart();
};

function changeTimeline(begin, end){
    //check if a update is necessary
    if(initialYearFilter != years[Math.round(begin)] || endYearFilter != years[Math.round(end)] ){
        initialYearFilter = years[Math.round(begin)];
        endYearFilter = years[Math.round(end)];
    
        genBubblechart(true, 0);
        updateLinechart();
    }
};