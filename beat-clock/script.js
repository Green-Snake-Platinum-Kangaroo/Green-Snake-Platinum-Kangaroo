$(document).ready(function () {

  // Dimension Settings
  var width = window.innerWidth, height = window.innerHeight;
  var angle = 45, aspect = width/height, near = 0.1, far = 10000;


  
  // World Objects
  var scene    = new THREE.Scene();
  var camera   = new THREE.PerspectiveCamera(angle, aspect, near, far);
  var renderer = new THREE.WebGLRenderer();

  var light    = new THREE.SpotLight(0xFFFFFF, 1);
  var material = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
  var red      = new THREE.MeshLambertMaterial({color: 0xFF0000});
  var grey     = new THREE.MeshLambertMaterial({color: 0x222222});

  var geometry = new THREE.CylinderGeometry(20, 21, 4, 48, 1, false);
  var dial     = new THREE.Mesh(geometry, material);

  var geometry = new THREE.CubeGeometry(3, 3, 3);
  geometry.applyMatrix( new THREE.Matrix4().makeTranslation(18,0,0));
  var mark1     = new THREE.Mesh(geometry, grey);

  var geometry = new THREE.CubeGeometry(3, 3, 3);
  geometry.applyMatrix( new THREE.Matrix4().makeTranslation(18,0,0));
  var mark2     = new THREE.Mesh(geometry, grey);

  var geometry = new THREE.CubeGeometry(3, 3, 3);
  geometry.applyMatrix( new THREE.Matrix4().makeTranslation(18,0,0));
  var mark3     = new THREE.Mesh(geometry, grey);

  var geometry = new THREE.CubeGeometry(3, 3, 3);
  geometry.applyMatrix( new THREE.Matrix4().makeTranslation(18,0,0));
  var mark4     = new THREE.Mesh(geometry, grey);

  var geometry = new THREE.CubeGeometry(15, 2, 2);
  geometry.applyMatrix( new THREE.Matrix4().makeTranslation(12,0,0));
  var second   = new THREE.Mesh(geometry, red);

  var geometry = new THREE.CubeGeometry(12, 1, 3);
  geometry.applyMatrix( new THREE.Matrix4().makeTranslation(15,0,0));
  var minute   = new THREE.Mesh(geometry, material);

  var geometry = new THREE.CubeGeometry(10, 1, 4);
  geometry.applyMatrix( new THREE.Matrix4().makeTranslation(15,0,0));

  var hour     = new THREE.Mesh(geometry, material);

  
  
  // Positions
  dial.position.x   = 0;
  dial.position.y   = -3;
  dial.position.z   = 0;

  mark1.position.x   = 0;
  mark1.position.y   = 0;
  mark1.position.z   = 0;

  mark2.position.x   = -18;
  mark2.position.y   = 0;
  mark2.position.z   = -18;

  mark3.position.x   = -36;
  mark3.position.y   = 0;
  mark3.position.z   = 0;

  mark4.position.x   = -18;
  mark4.position.y   = 0;
  mark4.position.z   = 18;

  second.position.x = 0;
  second.position.y = 1.5;
  second.position.z = 0;

  // minute.position.x = 0;
  // minute.position.y = 1;
  // minute.position.z = 0;

  // hour.position.x   = 0;
  // hour.position.y   = 2;
  // hour.position.z   = 0;

  light.position.x  = 0;
  light.position.y  = 100;
  light.position.z  = 0;
  light.lookAt(dial.position);

  camera.position.z = 0;
  camera.position.y = 80;
  camera.lookAt(dial.position);


  // Build World
  scene.add(camera);
  scene.add(light);
  scene.add(dial);
  scene.add(mark1);
  scene.add(mark2);
  scene.add(mark3);
  scene.add(mark4);
  scene.add(second);
  //scene.add(minute);
  //scene.add(hour);


  // Shadow
  renderer.shadowMapEnabled = true;

  light.castShadow       = true;
  light.shadowCameraNear = 1.0;
  light.shadowDarkness   = 0.5;

  dial.castShadow      = true;
  dial.receiveShadow   = true;

  mark1.castShadow      = true;
  mark1.receiveShadow   = true;

  second.castShadow    = true;
  second.receiveShadow = true;

  minute.castShadow    = true;
  minute.receiveShadow = true;

  hour.castShadow      = true;
  hour.receiveShadow   = true;


  // GUI
  //var gui = new dat.GUI();
  //gui.add(camera.position, 'x').min(-50).max(50).step(0.01);
  //gui.add(camera.position, 'y').min(-50).max(50).step(0.01);
  //gui.add(camera.position, 'z').min(-50).max(50).step(0.01);

  // deal with resizes


  // Set initial time
  var now = new Date();
  hour.rotation.y   = -((Math.PI * 2) * (now.getHours()   / 12.0))
  minute.rotation.y = -((Math.PI * 2) * (now.getMinutes() / 60.0))
  second.rotation.y = -((Math.PI * 2) * (now.getSeconds() / 60.0))
  //camera.rotation.z = second.rotation.y

    
  // Render
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);

  

  
  // Animation Tween
  var rotation_start = {angle: now.getSeconds() };
  var rotation_end   = {angle: rotation_start.angle + 1 };
  
  // dataset on hand object? or attribute directly?
  var tween1 = new TWEEN.Tween( rotation_start ).to( rotation_end, 1000 )
            .easing(TWEEN.Easing.Elastic.InOut)
            //.repeat( Infinity ) couldnt get this to fire 'on complete' to change values.
            .delay( 0 )
            .onUpdate( function() {
              second.rotation.y = -((Math.PI * 2) * (this.angle / 4.0));

            })
            .onComplete( function() {
              rotation_start.angle = new Date().getSeconds();
              rotation_end.angle   = rotation_start.angle + 1;
              
              // TODO fire off hour/minute animations here?
            })
            .start()
      
      // questionable? rely on the 1000ms with 0ms delay for accuracy.
      tween1.chain(tween1);

  
  // Update Method
  var update = function() {
    // delta here
    //second.rotation.y -= 0.0018;
    //minute.rotation.y -= 0.0018 / 60;
    //hour.rotation.y   -= 0.0018 / 60 / 12;
    //camera.rotation.z -= 0.0018;
    //mark.rotation.y = (new Date().getTime())/1000
    // it would be cool to see the camera rotate at second speed smooth, while the hand 'ticks' quartz style
                           
    TWEEN.update();
  };

  
  // Browser Animation Loop
  var animate = function() {
    update();

    requestAnimationFrame( animate );
    renderer.render(scene, camera);
  };
  
  animate();  
});