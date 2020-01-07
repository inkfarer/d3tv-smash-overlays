const scoreA = nodecg.Replicant('scoreA', {defaultValue: 0});
const scoreB = nodecg.Replicant('scoreB', {defaultValue: 0});
const nameA = nodecg.Replicant('nameA', {defaultValue: ""});
const nameB = nodecg.Replicant('nameB', {defaultValue: ""});
const flavorText = nodecg.Replicant('flavorText', {defaultValue: ""});
const clrRed = "#C9513E";
const clrBlue = "#3F51B5";

//onchange, onclick, etc. goes gere

//plus and minus buttons... could be done more gracefully but it's just 4 buttons
plusA.onclick = () => { scoreA.value++; };
minusA.onclick = () => { scoreA.value--; };
plusB.onclick = () => { scoreB.value++; };
minusB.onclick = () => { scoreA.value--; };

//changing scores by their inputs
displayA.addEventListener('input', (event) => { scoreA.value = Number(event.target.value); });
displayB.addEventListener('input', (event) => { scoreB.value = Number(event.target.value); });

//when text boxes get typed in, remind user to update
const toAddListeners = ["nameAInput", "nameBInput", "flavorInput"];
toAddListeners.forEach(element => { document.getElementById(element).addEventListener('input', () => {changeButtonColor(clrRed); })});

//handle replicant changes
scoreA.on('change', (newValue) => { displayA.value = newValue; });
scoreB.on('change', (newValue) => { displayB.value = newValue; });
nameA.on('change', (newValue) => { nameAInput.value = newValue; });
nameB.on('change', (newValue) => { nameBInput.value = newValue; });
flavorText.on('change', (newValue) => { flavorInput.value = newValue; });

updateNames.onclick = () => {
    nameA.value = nameAInput.value;
    nameB.value = nameBInput.value;
    flavorText.value = flavorInput.value;
    changeButtonColor(clrBlue);
};

//everything else

function changeButtonColor(color) {
    updateNames.style.backgroundColor = color;
}