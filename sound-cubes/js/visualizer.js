var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, $(window).width() / $(window).height(), 1, 1000);
var renderer = new THREE.WebGLRenderer();
var cubes = [];
var controls;

document.body.appendChild(renderer.domElement);

var i = 0;
for(var x = 0; x < 30; x += 2) {
	var j = 0;
	cubes[i] = [];
	for(var y = 0; y < 30; y += 2) {
		var geometry = new THREE.CubeGeometry(2, 1.5, 6);

		var material = new THREE.MeshPhongMaterial({
			color: randomFairColor(),
			ambient: 0x808080,
			specular: 0xffffff,
			shininess: 20,
			reflectivity: 5.5
		});

		cubes[i][j] = new THREE.Mesh(geometry, material);
		cubes[i][j].position = new THREE.Vector3(x, y, 0);

		scene.add(cubes[i][j]);
		j++;
	}
	i++;
}

var light = new THREE.AmbientLight(0x505050);
scene.add(light);

var directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);


directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(0, -1, -1);
scene.add(directionalLight);

directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(-1, -1, 0);
scene.add(directionalLight);

camera.position.z = 50;

controls = new THREE.OrbitControls(camera);
controls.addEventListener('change', render);

for(var i = 0; i < 7; i++) {
	controls.pan(new THREE.Vector3( 1, 0, 0 ));
	controls.pan(new THREE.Vector3( 0, 1, 0 ));
}

var render = function () {

	analyser.getByteFrequencyData(dataArray);
			for (var i = 0; i < bufferLength; i++) {
          boost += dataArray[i];
          // console.log('boost', boost);
      }
      boost = boost / bufferLength;

	if(typeof dataArray === 'object' && dataArray.length > 0) {
		// debugger;
		var k = 0;
		for(var i = 0; i < cubes.length; i++) {
			for(var j = 0; j < cubes[i].length; j++) {
				var scale = (dataArray[k] + boost) / 30;
				console.log('SCALE', scale, '[i]', i, '[j]', j);
				cubes[i][j].scale.z = (scale < 1 ? 1 : scale);
				k += (k < dataArray.length ? 1 : 0);
			}
    }
  }

  // for(var j = 0; j < bufferLength; j++){


  	// console.log('data array', dataArray);
  // }

	requestAnimationFrame(render);
	controls.update();
	renderer.render(scene, camera);
};
// console.log('data array', dataArray.length);
render();
renderer.setSize($(window).width(), $(window).height());

function randomFairColor() {
	var min = 64;
	var max = 224;
	var r = (Math.floor(Math.random() * (max - min + 1)) + min) * 65536;
	var g = (Math.floor(Math.random() * (max - min + 1)) + min) * 256;
	var b = (Math.floor(Math.random() * (max - min + 1)) + min);
	return r + g + b;
}
