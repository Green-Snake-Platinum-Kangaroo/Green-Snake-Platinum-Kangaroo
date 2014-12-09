var sourceJs;
var buffer;
var boost = 0;

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var analyser = audioCtx.createAnalyser();
var audio  = document.querySelector('audio');
audio.volume = 0.15;
var source = audioCtx.createMediaElementSource(audio);
source.connect(analyser);
var gainNode = audioCtx.createGain();
source.connect(gainNode);
gainNode.connect(audioCtx.destination);
analyser.fftSize = 256;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);

