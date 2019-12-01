module.exports = {
    secret: process.env.AUTH_SECRET,
    ttl: parseInt(process.env.AUTH_TTL)
}