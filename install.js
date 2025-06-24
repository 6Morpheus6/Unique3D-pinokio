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
      when: "{{platform === 'win32' && gpu === 'nvidia' && kernel.gpus && kernel.gpus.find(x => / 50.+/.test(x.model))}}",
      method: "shell.run",
      params: {
        env: {},
        venv: "env",
        path: "app",
        message: [
          "uv pip install https://github.com/MiroPsota/torch_packages_builder/releases/download/pytorch3d-0.7.8%2B366eff2/pytorch3d-0.7.8+366eff2pt2.7.0cu128-cp310-cp310-win_amd64.whl",
          "uv pip install https://data.pyg.org/whl/torch-2.7.0%2Bcu128/torch_scatter-2.1.2%2Bpt27cu128-cp310-cp310-win_amd64.whl",
          "uv pip install -r ../requirements.txt",
          "copy /Y ..\\nvdiffrast\\ops.py env\\Lib\\site-packages\\nvdiffrast\\torch\\"
        ]
      },
      next: "model"
    },
    {
      when: "{{platform === 'linux' && gpu === 'nvidia' && kernel.gpus && kernel.gpus.find(x => / 50.+/.test(x.model))}}",
      method: "shell.run",
      params: {
        env: {},
        venv: "env",
        path: "app",
        message: [
          "uv pip install https://github.com/MiroPsota/torch_packages_builder/releases/download/pytorch3d-0.7.8/pytorch3d-0.7.8+pt2.7.0cu128-cp310-cp310-linux_x86_64.whl",
          "uv pip install https://data.pyg.org/whl/torch-2.7.0%2Bcu128/torch_scatter-2.1.2%2Bpt27cu128-cp310-cp310-linux_x86_64.whl",
          "uv pip install -r ../requirements.txt"
        ]
      },
      next: "model"
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
          "uv pip install -r ../requirements.txt",
          "uv pip install git+https://github.com/facebookresearch/pytorch3d.git@stable --no-build-isolation",
          "uv pip install torch_scatter --no-build-isolation"
        ]
      }
    },
    {
      id: "model",
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
