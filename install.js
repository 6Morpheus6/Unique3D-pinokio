module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/AiuniAI/Unique3D app",
        ]
      }
    },
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",
          path: "app",
          xformers: true
          // triton: true
          // sageattention: true
        }
      }
    },
    {
      method: "shell.run",
      params: {
        build: true,
        env: {
          DISTUTILS_USE_SDK: "1"
        },
        venv: "env",
        path: "app",
        message: [
          "uv pip install -U setuptools",
          "uv pip install -r ../requirements.txt --no-build-isolation"
        ]
      }
    },
    {
      method: "hf.download",
      params: {
        path: "app",
        "_": [ "Wuvin/Unique3D" ],
        "local-dir": "ckpt",
      }
    }
  ]
}
