import * as THREE from "three";

const BOX_HEIGHT = 0.5;
const START_SIZE = 3;
const RANGE = 4.6;
const PERFECT_TOLERANCE = 0.12;
const VIEW_HEIGHT = 10;

type Axis = "x" | "z";
type Layer = { mesh: THREE.Mesh; width: number; depth: number };
type Debris = { mesh: THREE.Mesh; velocity: THREE.Vector3; spin: THREE.Vector3 };

export type PlaceResult = { score: number; perfect: boolean };

type Callbacks = {
  onPlace: (result: PlaceResult) => void;
  onOver: (score: number) => void;
};

const PHOSPHOR = new THREE.Color("#5cf2b0");
const SODIUM = new THREE.Color("#ffb547");

export class StackGame {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.OrthographicCamera;
  private geometry = new THREE.BoxGeometry(1, 1, 1);
  private layers: Layer[] = [];
  private debris: Debris[] = [];
  private moving: Layer | null = null;
  private axis: Axis = "x";
  private direction = 1;
  private combo = 0;
  private cameraY = 0;
  private cameraZoom = 1;
  private frame = 0;
  private lastTime = 0;
  private running = false;
  state: "idle" | "playing" | "over" = "idle";

  constructor(
    private canvas: HTMLCanvasElement,
    private callbacks: Callbacks,
  ) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 200);

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.75));
    const key = new THREE.DirectionalLight(0xffffff, 1.4);
    key.position.set(6, 12, 8);
    this.scene.add(key);
    const rim = new THREE.DirectionalLight(0xffb547, 0.6);
    rim.position.set(-8, 4, -6);
    this.scene.add(rim);

    const foundation = new THREE.Mesh(
      this.geometry,
      new THREE.MeshStandardMaterial({ color: "#13283a", roughness: 0.8 }),
    );
    foundation.scale.set(START_SIZE, 8, START_SIZE);
    foundation.position.y = -4 - BOX_HEIGHT / 2;
    this.scene.add(foundation);

    this.reset();
    this.resize();
  }

  private colorFor(index: number) {
    const t = (1 - Math.cos(index * 0.22)) / 2;
    return PHOSPHOR.clone().lerpHSL(SODIUM, t);
  }

  private addLayer(x: number, z: number, width: number, depth: number) {
    const index = this.layers.length;
    const mesh = new THREE.Mesh(
      this.geometry,
      new THREE.MeshStandardMaterial({ color: this.colorFor(index), roughness: 0.4, metalness: 0.05 }),
    );
    mesh.scale.set(width, BOX_HEIGHT, depth);
    mesh.position.set(x, index * BOX_HEIGHT, z);
    this.scene.add(mesh);
    const layer = { mesh, width, depth };
    this.layers.push(layer);
    return layer;
  }

  private clear() {
    for (const layer of this.layers) {
      this.scene.remove(layer.mesh);
      (layer.mesh.material as THREE.Material).dispose();
    }
    for (const piece of this.debris) {
      this.scene.remove(piece.mesh);
      (piece.mesh.material as THREE.Material).dispose();
    }
    this.layers = [];
    this.debris = [];
    this.moving = null;
  }

  reset() {
    this.clear();
    this.addLayer(0, 0, START_SIZE, START_SIZE);
    this.combo = 0;
    this.cameraZoom = 1;
    this.state = "idle";
    this.renderOnce();
  }

  start() {
    this.clear();
    this.addLayer(0, 0, START_SIZE, START_SIZE);
    this.combo = 0;
    this.cameraZoom = 1;
    this.axis = "z";
    this.state = "playing";
    this.spawn();
  }

  private spawn() {
    const previous = this.layers[this.layers.length - 1];
    this.axis = this.axis === "x" ? "z" : "x";
    this.direction = 1;
    const layer = this.addLayer(previous.mesh.position.x, previous.mesh.position.z, previous.width, previous.depth);
    layer.mesh.position[this.axis] = -RANGE;
    this.moving = layer;
  }

  place() {
    if (this.state !== "playing" || !this.moving) return;
    const current = this.moving;
    const previous = this.layers[this.layers.length - 2];
    const axis = this.axis;
    const sizeKey = axis === "x" ? "width" : "depth";
    const delta = current.mesh.position[axis] - previous.mesh.position[axis];
    const overhang = Math.abs(delta);
    const size = current[sizeKey];
    const overlap = size - overhang;

    if (overlap <= 0) {
      this.layers.pop();
      this.dropPiece(current.mesh, Math.sign(delta) || 1);
      this.moving = null;
      this.state = "over";
      this.cameraZoom = Math.min(1, VIEW_HEIGHT / (this.layers.length * BOX_HEIGHT + 8));
      this.callbacks.onOver(this.layers.length - 1);
      return;
    }

    let perfect = false;
    if (overhang < PERFECT_TOLERANCE) {
      perfect = true;
      this.combo += 1;
      current.mesh.position[axis] = previous.mesh.position[axis];
      if (this.combo >= 3) {
        current[sizeKey] = Math.min(START_SIZE, size + 0.15);
      }
    } else {
      this.combo = 0;
      const center = previous.mesh.position[axis] + delta / 2;
      current[sizeKey] = overlap;
      current.mesh.position[axis] = center;

      const piece = new THREE.Mesh(this.geometry, (current.mesh.material as THREE.Material).clone());
      piece.scale.copy(current.mesh.scale);
      piece.scale[axis] = overhang;
      piece.position.copy(current.mesh.position);
      piece.position[axis] = center + Math.sign(delta) * (overlap + overhang) / 2;
      this.scene.add(piece);
      this.dropPiece(piece, Math.sign(delta));
    }

    current.mesh.scale.set(current.width, BOX_HEIGHT, current.depth);
    this.moving = null;
    this.callbacks.onPlace({ score: this.layers.length - 1, perfect });
    this.spawn();
  }

  private dropPiece(mesh: THREE.Mesh, sign: number) {
    const velocity = new THREE.Vector3(0, 1.5, 0);
    velocity[this.axis] = sign * 2.5;
    const spin = new THREE.Vector3(
      this.axis === "z" ? sign * 2.5 : 0,
      0,
      this.axis === "x" ? -sign * 2.5 : 0,
    );
    this.debris.push({ mesh, velocity, spin });
  }

  resize() {
    const { clientWidth, clientHeight } = this.canvas.parentElement ?? this.canvas;
    if (!clientWidth || !clientHeight) return;
    const aspect = clientWidth / clientHeight;
    this.renderer.setSize(clientWidth, clientHeight, false);
    this.camera.left = (-VIEW_HEIGHT * aspect) / 2;
    this.camera.right = (VIEW_HEIGHT * aspect) / 2;
    this.camera.top = VIEW_HEIGHT / 2;
    this.camera.bottom = -VIEW_HEIGHT / 2;
    this.camera.updateProjectionMatrix();
    this.renderOnce();
  }

  private update(dt: number) {
    if (this.state === "playing" && this.moving) {
      const speed = Math.min(7.5, 3.4 + this.layers.length * 0.09);
      const position = this.moving.mesh.position;
      position[this.axis] += this.direction * speed * dt;
      if (Math.abs(position[this.axis]) > RANGE) {
        position[this.axis] = Math.sign(position[this.axis]) * RANGE;
        this.direction *= -1;
      }
    }

    for (let i = this.debris.length - 1; i >= 0; i -= 1) {
      const piece = this.debris[i];
      piece.velocity.y -= 22 * dt;
      piece.mesh.position.addScaledVector(piece.velocity, dt);
      piece.mesh.rotation.x += piece.spin.x * dt;
      piece.mesh.rotation.z += piece.spin.z * dt;
      if (piece.mesh.position.y < this.cameraY - 20) {
        this.scene.remove(piece.mesh);
        (piece.mesh.material as THREE.Material).dispose();
        this.debris.splice(i, 1);
      }
    }

    const top = Math.max(0, (this.layers.length - 1) * BOX_HEIGHT);
    const targetY = this.state === "over" ? top / 2 : top;
    this.cameraY = THREE.MathUtils.damp(this.cameraY, targetY, 4, dt);
    this.camera.zoom = THREE.MathUtils.damp(this.camera.zoom, this.cameraZoom, 3, dt);
    this.camera.updateProjectionMatrix();
  }

  private renderOnce() {
    this.camera.position.set(9, this.cameraY + 9, 9);
    this.camera.lookAt(0, this.cameraY - 1.2, 0);
    this.renderer.render(this.scene, this.camera);
  }

  setActive(active: boolean) {
    if (active === this.running) return;
    this.running = active;
    if (active) {
      this.lastTime = performance.now();
      const loop = (now: number) => {
        const dt = Math.min(0.05, (now - this.lastTime) / 1000);
        this.lastTime = now;
        this.update(dt);
        this.renderOnce();
        this.frame = requestAnimationFrame(loop);
      };
      this.frame = requestAnimationFrame(loop);
    } else {
      cancelAnimationFrame(this.frame);
    }
  }

  dispose() {
    this.setActive(false);
    this.clear();
    this.geometry.dispose();
    this.renderer.dispose();
  }
}
