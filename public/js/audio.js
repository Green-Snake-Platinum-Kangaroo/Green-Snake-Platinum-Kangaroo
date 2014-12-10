/*
	The following section is the setup for routing Audio to the visualizer:

	There are 5 general steps:

	1. Create audio context
	2. Inside the context, create sources — such as <audio>, oscillator, stream
	3. Create effects nodes, such as reverb, biquad filter, panner, compressor
	4. Choose final destination of audio, for example your system speakers
	5. Connect the sources up to the effects, and the effects to the destination.

	For more information see:	https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API

*/


// 1. Create audio context, see: https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// 2. Inside the context, create sources
var audio  = document.querySelector('audio'); // creating a reference to the <audio> tag on index.html
audio.volume = 0.15;
var source = audioCtx.createMediaElementSource(audio);

// 3. Create effects nodes
var analyser = audioCtx.createAnalyser();


// 4. Choose final destination of audio
analyser.connect(audioCtx.destination);

// 5. Connect the sources up to the effects
source.connect(analyser);


analyser.fftSize = 256;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
