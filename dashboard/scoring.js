const scoreA = nodecg.Replicant('scoreA', {defaultValue: 0});
const scoreB = nodecg.Replicant('scoreB', {defaultValue: 0});
const nameA = nodecg.Replicant('nameA', {defaultValue: ""});
const nameB = nodecg.Replicant('nameB', {defaultValue: ""});
const flavorText = nodecg.Replicant('flavorText', {defaultValue: ""});
const clrRed = "#C9513E";
const clrBlue = "#3F51B5";

//onchange, onclick, etc. goes gere

//plus and minus buttons... could be done more gracefully but it's just 4 buttons
p1PlusB.onclick = () => { scoreA.value++; };
p1MinusB.onclick = () => { scoreA.value--; };
p2PlusB.onclick = () => { scoreB.value++; };
p2MinusB.onclick = () => { scoreB.value--; };

//changing scores by their inputs
p1Display.addEventListener('input', (event) => { scoreA.value = Number(event.target.value); });
p2Display.addEventListener('input', (event) => { scoreB.value = Number(event.target.value); });

//when text boxes get typed in, remind user to update
const toAddListeners = ["p1NameInput", "p2NameInput", "flavorInput"];
toAddListeners.forEach(element => { document.getElementById(element).addEventListener('input', () => { changeButtonColor(clrRed); })});

//handle replicant changes
scoreA.on('change', (newValue) => { p1Display.value = newValue; });
scoreB.on('change', (newValue) => { p2Display.value = newValue; });
nameA.on('change', (newValue) => { p1NameInput.value = newValue; });
nameB.on('change', (newValue) => { p2NameInput.value = newValue; });
flavorText.on('change', (newValue) => { flavorInput.value = newValue; });

updateNames.onclick = () => {
    nameA.value = p1NameInput.value;
    nameB.value = p2NameInput.value;
    flavorText.value = flavorInput.value;
    changeButtonColor(clrBlue);
};

beginNext.onclick = () => {
    scoreA.value = 0; scoreB.value = 0;
    nameA.value = nextNameAInput.value;
    nameB.value = nextNameBInput.value;
    nextNameAInput.value = ""; nextNameBInput.value = "";
}

//everything else

function changeButtonColor(color) {
    updateNames.style.backgroundColor = color;
}