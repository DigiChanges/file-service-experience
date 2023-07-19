module.exports = {
    apps : [{
        name: "file-service-experience",
        script: "./dist/src/index.js",
        error_file: "./dist/src/logs/err.log",
        watch: false,
        instances: 2,
        ignore_watch: './dist/src/logs/*',
        instance_var: "0"
    }]
}
