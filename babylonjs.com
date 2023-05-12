DracoCompression.Configuration = {
  decoder: {
    wasmUrl: "/babylon-draco-files/draco_wasm_wrapper_gltf.js",
    wasmBinaryUrl: "/babylon-draco-files/draco_decoder_gltf.wasm",
    fallbackUrl: "/babylon-draco-files/draco_decoder_gltf.js",
  },
};