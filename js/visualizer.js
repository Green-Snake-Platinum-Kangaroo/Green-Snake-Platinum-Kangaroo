// Dimension Settings set the scene size
var width = window.innerWidth;
var height = window.innerHeight;

// set some camera attributes
var view_angle = 50;
var aspect = width / height;
var near = 1;
var far = 10000;

// get the DOM element to attach to
var $container = $('#container');

  // create a WebGL renderer, camera and a scene
var renderer = new THREE.WebGLRenderer({alpha:true});
var camera = new THREE.PerspectiveCamera(view_angle, aspect, near, far);
var scene = new THREE.Scene();

// initial the boxes
var cubes = [];
var controls;

var row = 0;
for(var x = 0; x < 30; x += 2) {
  var col = 0;
  cubes[row] = [];
  for(var y = 0; y < 30; y += 2) {
    var geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    var material = new THREE.MeshPhongMaterial({
      color: randomFairColor(),
      ambient: 0x808080,
      specular: 0x999999,
      shininess: 100,
      opacity:0.8,
      transparent: true
    });
		cubes[row][col] = new THREE.Mesh(geometry, material);
		cubes[row][col].position.x = x;
    cubes[row][col].position.y = y;
    cubes[row][col].position.z = 0;
		scene.add(cubes[row][col]);
		col++;
	}
	row++;
}

  // create a point light
var light = new THREE.DirectionalLight(0xffffff);
scene.add(light);

var light = new THREE.DirectionalLight(0xffffff, 0.7);
light.position.set(0, 1, 1);
scene.add(light);

light = new THREE.DirectionalLight(0xffffff, 0.7);
light.position.set(1, 1, 0);
scene.add(light);


light = new THREE.DirectionalLight(0xffffff, 0.7);
light.position.set(0, -1, -1);
scene.add(light);

light = new THREE.DirectionalLight(0xffffff, 0.7);
light.position.set(-1, -1, 0);
scene.add(light);

 // set the camera position
camera.position.z = 50;

controls = new THREE.OrbitControls(camera);
controls.addEventListener('change', render);

for(var i = 0; i < 7; i++) {
	controls.pan(new THREE.Vector3( 1, 0, 0 ));
	controls.pan(new THREE.Vector3( 0, 1, 0 ));
}

var render = function () {
	analyser.getByteFrequencyData(dataArray);
	var zeros = Array.prototype.slice.call(dataArray);
	zeros = zeros.reduce(function(a, b){ return a + b; });

	if(typeof dataArray === 'object' && dataArray.length > 0 && zeros > 0) {
		var k = 0;
		for(var row = 0; row < cubes.length; row++) {
			for(var col = 0; col < cubes[row].length; col++) {
				boost += dataArray[row];
				var scale = (dataArray[k] + boost) / 5000;
				cubes[row][col].scale.z = (scale < 1 ? 1 : scale);
				cubes[row][col].material.color.r = scale;
				if(isNaN(k)){
					k += 0;
				}
				k += (k < dataArray.length ? 1 : 0);
			}
    }
    boost = boost / bufferLength;
  }

	requestAnimationFrame(render);
	controls.update();
	renderer.render(scene, camera);
};

  // start the renderer
renderer.setSize(width, height);

// and make it pretty
renderer.setClearColor(0xffffff, 0.7);
renderer.clear();

render();

// attach the render-supplied DOM element
$container.append(renderer.domElement);

function randomFairColor() {
	var min = 64;
	var max = 224;
	var r = (Math.floor(Math.random() * (max - min + 1)) + min) * 65536;
	var g = (Math.floor(Math.random() * (max - min + 1)) + min) * 256;
	var b = (Math.floor(Math.random() * (max - min + 1)) + min);
	return r + g + b;
}
