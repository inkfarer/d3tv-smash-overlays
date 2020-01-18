class MusicHandler {
	constructor() {
		this.nowPlaying = nodecg.Replicant("nowPlaying");
		this.nowPlayingManual = nodecg.Replicant('nowPlayingManual', {defaultValue: {
			artist: "",
			song: ""
		}});
		this.mSongEnabled = nodecg.Replicant('mSongEnabled');
		this.musicShown = nodecg.Replicant('musicShown', {defaultValue: true});
	}

	animSongName(songName) {
		songName = "♪ " + songName + " ♪";
		if (!this.musicShown.value) {
			songText.text = songName;
		} else {
			gsap.to("#songText", 0.5, {opacity: 0, onComplete: function() {
				songText.text = songName;
				gsap.to("#songText", 0.5, {opacity: 1});
			}});
		}
	}

	setNowPlayingLastFM(value) {
		if (value.artist !== undefined && value.song !== undefined) {
			const songName = value.artist + " - " + value.song;
			this.animSongName(songName);
		} else {
			this.animSongName("No song is currently playing.");
		}
	}

	setNowPlayingManual(value) {
		//we can accept an empty field in this case
		if (value.artist === undefined && value.song === undefined || value.artist === "" && value.song === "") {this.animSongName("No song is currently playing.");}
		else if (value.artist === undefined || value.artist === "") {this.animSongName(value.song);}
		else if (value.song === undefined || value.song === "") {this.animSongName(value.artist);}
		else {
			const songName = value.artist + " - " + value.song;
			this.animSongName(songName);
		}
	}

	listen() {
		this.nowPlaying.on('change', (newValue, oldValue) => {
			if (newValue !== oldValue && !this.mSongEnabled.value) {
				this.setNowPlayingLastFM(newValue);
			}
		});
		
		this.nowPlayingManual.on('change', (newValue, oldValue) => {
			if (newValue !== oldValue && this.mSongEnabled.value) {
				this.setNowPlayingManual(newValue);
			}
		});
		
		this.mSongEnabled.on('change', (newValue, oldValue) => {
			if (newValue !== oldValue) {
				if (newValue) {
					this.setNowPlayingManual(this.nowPlayingManual.value);
				} else {
					this.setNowPlayingLastFM(this.nowPlaying.value);
				}
			}
		});
		
		this.musicShown.on('change', newValue => {
			let opacityVal;
			if (newValue) { opacityVal = 1; }
			else { opacityVal = 0; }
			gsap.to("#songText", 0.5, {opacity: opacityVal});
		});
	}
}

const MHandler = new MusicHandler().listen();

class NextUpHandler {
	constructor() {
		this.nextNameA = nodecg.Replicant('nextNameA', {defaultValue: ""});
		this.nextNameB = nodecg.Replicant('nextNameB', {defaultValue: ""});
		this.nextUpShown = nodecg.Replicant('nextUpShown', {defaultValue: true});
	}

	showHideCardA(show) { 
		let rotationVal, easeVal, bottomVal, delayVal;
		if (show) {
			rotationVal = "-25_ccw"; bottomVal = 85;
			easeVal = "power2.out"; delayVal = 0.7;
		} else {
			rotationVal = "-10_cw"; bottomVal = -400;
			easeVal = "power2.in"; delayVal = 0;
		}
		gsap.to("#first-card", 0.75, {ease: easeVal, rotation: rotationVal, bottom: bottomVal, delay: delayVal});
	}

	showHideCardB(show) { 
		let rotationVal, easeVal, bottomVal, delayVal;
		if (show) {
			rotationVal = "4_ccw"; bottomVal = 105;
			easeVal = "power2.out"; delayVal = 0.7;
		} else {
			rotationVal = "22_cw"; bottomVal = -410;
			easeVal = "power2.in"; delayVal = 0;
		}
		gsap.to("#second-card", 0.75, {ease: easeVal, rotation: rotationVal, bottom: bottomVal, delay: delayVal});
	}

	showHideDecor(show) {
		let opacityVal, delayVal;
		if (show) { opacityVal = 1; delayVal = 0.5; }
		else { opacityVal = 0; delayVal = 0.5; }
		gsap.to(".table-decor", 0.5, {opacity: opacityVal, delay: delayVal});
		gsap.to(".nextUp", 0.5, {opacity: opacityVal, delay: delayVal});
	}

	moveTexts(show) {
		let topVal, delayVal;
		if (show) { topVal = 170; delayVal = 0; }
		else { topVal = 440; delayVal = 0.6; }
		gsap.to(".brbTexts", 1, {ease: "expo.inOut", top: topVal, delay: delayVal});
	}

	showHideNextUp(showValue) {
		this.showHideCardA(showValue);
		this.showHideCardB(showValue);
		this.showHideDecor(showValue);
		this.moveTexts(showValue);
	}

	listen() {
		this.nextNameA.on('change', (newValue, oldValue) => {
			document.getElementById("first-card-text").innerText = newValue;
		});

		this.nextNameB.on('change', (newValue, oldValue) => {
			document.getElementById("second-card-text").innerText = newValue;
		});

		this.nextUpShown.on('change', newValue => {
			this.showHideNextUp(newValue);
		});
	}
}

const NUHandler = new NextUpHandler().listen();

class BreakTextHander {
	constructor() {
		this.bigTextValue = nodecg.Replicant('bigTextValue', {defaultValue: "Be right back!"});
	}

	listen() {
		this.bigTextValue.on('change', newValue => {
			bigText.text = newValue;
		})
	}
}

const BTHandler = new BreakTextHander().listen();