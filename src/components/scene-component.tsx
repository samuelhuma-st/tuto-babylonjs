import { FC, useEffect, useRef } from "react";
import { Engine, Scene } from "@babylonjs/core";

interface ISceneComponents {
  antialias: boolean;
  engineOptions: any;
  adaptToDeviceRatio: any;
  sceneOptions: any;
  onRender: any; 
  onSceneReady: any;
}

const SceneComponents: FC<ISceneComponents> = ({
  antialias,
  engineOptions,
  adaptToDeviceRatio,
  sceneOptions,
  onRender,
  onSceneReady,
  ...rest
}) => {
  const reactCanvas = useRef(null);

  // set up basic engine and scene
  useEffect(() => {
    const { current: canvas } = reactCanvas;

    if (!canvas) return;

    const engine = new Engine(
      canvas,
      antialias,
      engineOptions,
      adaptToDeviceRatio
    );
    const scene = new Scene(engine, sceneOptions);
    if (scene.isReady()) {
      onSceneReady(scene);
    } else {
      scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
    }

    engine.runRenderLoop(() => {
      if (typeof onRender === "function") onRender(scene);
      scene.render();
    });

    const resize = () => {
      scene.getEngine().resize();
    };

    if (window) {
      window.addEventListener("resize", resize);
    }

    return () => {
      scene.getEngine().dispose();

      if (window) {
        window.removeEventListener("resize", resize);
      }
    };
  }, [
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    onRender,
    onSceneReady,
  ]);

  return (
    <div style={{ width: "1000px", height: "100vh", background: "red" }}>
      <canvas
        style={{ width: "100%", height: "100%" }}
        ref={reactCanvas}
        {...rest}
      />
    </div>
  );
};

export default SceneComponents;
