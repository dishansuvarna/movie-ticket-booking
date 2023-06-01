module.exports.respond = {
    ok: ( res, payload ) => {
        res.send( { code: 200, msg: "ok", data: payload })
    },
    err: ( res , error ) => {
        res.send(error)
    }
}