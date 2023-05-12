import {
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
} from "@babylonjs/core";
import { Tools } from "babylonjs";
import { Engine, Model, Scene } from "react-babylonjs";
import "@babylonjs/loaders";
import { Suspense } from "react";

let box: any;

const onSceneReady = (scene: any) => {
  // This creates and positions a free camera (non-mesh)
  const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  // Our built-in 'box' shape.
  box = MeshBuilder.CreateBox("box", { size: 2 }, scene);

  // Move the box upward 1/2 its height
  box.position.y = 1;

  // Our built-in 'ground' shape.
  MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
};

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene: any) => {
  if (box !== undefined) {
    const deltaTimeInMillis = scene.getEngine().getDeltaTime();

    const rpm = 10;
    box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  }
};

const WithSpring = () => {
  return (
    <>
      <arcRotateCamera
        name="camera1"
        target={Vector3.Zero()}
        radius={6}
        alpha={-Math.PI / 2}
        beta={Math.PI / 2.5}
        lowerRadiusLimit={Tools.ToRadians(220)}
        upperRadiusLimit={Tools.ToRadians(480)}
        upperBetaLimit={Tools.ToRadians(50)}
        wheelPrecision={100}
      />
      <box name="box1" width={1} height={1} depth={1} />
      <hemisphericLight
        name="Light1"
        intensity={0.5}
        direction={Vector3.Up()}
      />
      <ground name="ground1" width={6} height={6} subdivisions={2}></ground>
    </>
  );
};

export const TranslateCamera = () => (
  <div>
    <Engine antialias adaptToDeviceRatio canvasId="sample-canvas">
      <Scene>
        <WithSpring />
      </Scene>
    </Engine>
  </div>
);

let baseUrl =
  "https://raw.githubusercontent.com/samuelhuma-st/tuto-babylonjs/master/public/";

const App = () => (
  <div className="section">
    {/* <div className="text">
      <Box />
      Assign arrow function to a variable before exporting as module defaul
    </div> */}
    {/* <SceneComponent
      antialias
      onSceneReady={onSceneReady}
      onRender={onRender}
      engineOptions={undefined}
      adaptToDeviceRatio={undefined}
      sceneOptions={undefined}
    /> */}
    <div>
      <Engine antialias adaptToDeviceRatio canvasId="sample-canvas">
        <Scene useRightHandedSystem={true}>
          <Suspense>
            <arcRotateCamera
              name="camera2"
              target={Vector3.Zero()}
              radius={6}
              alpha={-Math.PI / 2}
              beta={Math.PI / 2.5}
              lowerRadiusLimit={Tools.ToRadians(220)}
              upperRadiusLimit={Tools.ToRadians(480)}
              upperBetaLimit={Tools.ToRadians(50)}
              wheelPrecision={100}
            />
            <hemisphericLight
              name="Light2"
              intensity={0.5}
              direction={Vector3.Up()}
            />

            <Model
              rootUrl={`${baseUrl}`}
              sceneFilename="book.gltf"
              name={"book"}
            />
            <box name="box2" width={1} height={1} depth={1} />
          </Suspense>
        </Scene>
      </Engine>
    </div>
    <div style={{ height: "100vh", backgroundColor: "red" }}>
      <TranslateCamera />
    </div>
  </div>
);
export default App;
