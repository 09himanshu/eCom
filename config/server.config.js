if(process.nextTick.NODE_ENV !== 'production') {
    require('dotenv').config();
}

module.exports = {
    port: process.env.port,
    host: process.env.host,
    db: process.env.db,
    password: process.env.password,
    user: process.env.user,
    dialect: process.env.dialect,
    secret: process.env.secretkey,
    pool: {
        max: process.env.max,
        min: process.env.min,
        acquire: process.env.acquire,
        idle: process.env.idle
    }
}