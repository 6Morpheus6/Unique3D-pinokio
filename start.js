module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        build: true,
        venv: "env",
        env: { },
        path: "app",
        message: [
          "python gradio_local.py",
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
