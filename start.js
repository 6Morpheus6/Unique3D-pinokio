module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        venv: "../env",
        env: { },
        path: "app/app",
        message: [
          "python gradio_local.py --port 7860",
        ],
        on: [{
          "event": "/http:\/\/\\S+/",
          "done": true
        }]
      }
    },
    {
      method: "local.set",
      params: {
        url: "{{input.event[0]}}"
      }
    }
  ]
}
