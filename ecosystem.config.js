module.exports = {
  apps: [
    {
      name: 'online',
      exec_mode: 'cluster',
      instances: '6', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ]
}
