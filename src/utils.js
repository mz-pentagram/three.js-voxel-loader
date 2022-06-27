import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { VOXLoader, VOXMesh } from "three/examples/jsm/loaders/VOXLoader.js";

let camera, controls, scene, renderer;

export const init = () => {
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.01,
    10
  );
  camera.position.set(0.175, 0.075, 0.175);
  scene = new THREE.Scene();
  scene.add(camera);

  // light
  const hemiLight = new THREE.HemisphereLight(0x888888, 0x444444, 1);
  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.75);
  dirLight.position.set(1.5, 3, 2.5);
  scene.add(dirLight);

  const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
  dirLight2.position.set(-1.5, -3, -2.5);
  scene.add(dirLight2);

  // vox
  const loader = new VOXLoader();
  loader.load("../models/8x8x8.vox", (chunks) => {
    chunks.forEach((chunk) => {
      const mesh = new VOXMesh(chunk);
      mesh.scale.setScalar(0.0015);
      scene.add(mesh);
    });
  });

  // renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 0.1;
  controls.maxDistance = 0.5;
  window.addEventListener("resize", onWindowResize);
};

export const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

export const update = () => {
  requestAnimationFrame(update);
  controls.update();
  renderer.render(scene, camera);
};
