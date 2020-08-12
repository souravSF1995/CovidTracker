const confirmedCtn = document.querySelector('.confirmed');
const activeCtn = document.querySelector('.active');
const recoveredCtn = document.querySelector('.recovered');
const deceasedCtn = document.querySelector('.deceased');
const lastUpdatedSpan = document.querySelector('.lu-value');
const statesDropDown = document.querySelector('.states');
let cachedResponse = null;

async function init() {
  const response = await fetch('https://api.covid19india.org/data.json');
  const body = await response.json();
  cachedResponse = body.statewise;

  setStatesFilter(body.statewise);
  updateData(body.statewise, 'TT');
}

function updateData(stateData, selectedState) {
  const data = stateData.find(s => s.statecode === selectedState);

  const confirmedDelta = data.deltaconfirmed;
  const recoveredDelta = data.deltarecovered;
  const deceasedDelta = data.deltadeaths;

  const confirmedCount = data.confirmed;
  const activeCount = data.active;
  const recoveredCount = data.recovered;
  const deceasedCount = data.deaths;

  const lastUpdatedTime = data.lastupdatedtime;

  updateDeltas(confirmedDelta, recoveredDelta, deceasedDelta);
  updateValues(confirmedCount, activeCount, recoveredCount, deceasedCount);
  updateLastUpdatedTime(lastUpdatedTime);
}

function setStatesFilter(statesData) {
  let options = '';
  for (const s of statesData) {
    options += `<option value='${s.statecode}'>${s.state}</option>`
  }
  statesDropDown.innerHTML = options;
}

function updateDeltas(confirmedDelta, recoveredDelta, deceasedDelta) {
  confirmedCtn.querySelector('.data-change').innerHTML = `[+${confirmedDelta}]`;
  recoveredCtn.querySelector('.data-change').innerHTML = `[+${recoveredDelta}]`;
  deceasedCtn.querySelector('.data-change').innerHTML = `[+${deceasedDelta}]`;
}

function updateValues(confirmedCount, activeCount, recoveredCount, deceasedCount) {
  confirmedCtn.querySelector('.data-value').innerHTML = confirmedCount;
  activeCtn.querySelector('.data-value').innerHTML = activeCount;
  recoveredCtn.querySelector('.data-value').innerHTML = recoveredCount;
  deceasedCtn.querySelector('.data-value').innerHTML = deceasedCount;
}

function updateLastUpdatedTime(time) {
  lastUpdatedSpan.innerHTML = time;
}

statesDropDown.addEventListener('change', function (e) {
  const selectedState = e.target.value;
  if (cachedResponse) {
    updateData(cachedResponse, selectedState);
  }
});

window.onload = init;