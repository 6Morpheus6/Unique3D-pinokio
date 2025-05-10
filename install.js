module.exports = {
  run: [
    {
      when: "{{gpu !== 'nvidia'}}",
      method: "notify",
      params: {
        html: "This app requires an NVIDIA GPU."
      }, 
       next: null
     },
     {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/6Morpheus6/Unique3D app",
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
          xformers: true,
          triton: true
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
        "_": [ "Wuvin/Unique3D" ],
        "exclude": '".gitattributes" ".gitignore" "*.md" "*.txt" "*.py" "*.whl" "*.png" "image2normal.yaml" "image2mvimage.yaml" "*.jpg"',
        "repo-type": "space",
        "local-dir": "app",
      }
    }
  ]
}
