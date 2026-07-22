module.exports = {
  apps: [
    {
      name: "ideact",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      cwd: __dirname,
      instances: 1, // bump for cluster mode once behind a shared session/rate-limit store
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
      },
      // Zero-downtime reload: `pm2 reload ecosystem.config.js`
      wait_ready: false,
      listen_timeout: 10000,
      kill_timeout: 5000,
    },
  ],
};
