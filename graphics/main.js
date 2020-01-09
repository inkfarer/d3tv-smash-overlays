const scoreA = nodecg.Replicant('scoreA', {defaultValue: 0});
const scoreB = nodecg.Replicant('scoreB', {defaultValue: 0});
const nameA = nodecg.Replicant('nameA', {defaultValue: ""});
const nameB = nodecg.Replicant('nameB', {defaultValue: ""});
const flavorText = nodecg.Replicant('flavorText', {defaultValue: ""});

scoreA.on('change', (newValue) => { p1score.text = newValue; })
scoreB.on('change', (newValue) => { p2score.text = newValue; })
flavorText.on('change', (newValue) => { document.getElementById("flavorText").text = newValue; });
nameA.on('change', (newValue) => { p1Name.text = newValue; });
nameB.on('change', (newValue) => { p2Name.text = newValue; });