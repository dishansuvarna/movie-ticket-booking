const { Op } = require('sequelize')
const Cinema = require('../../models/cinemas')
const { respond } = require('../../../helper')
const { RESPONSE } = require('../../../config')

async function cinemaList (req, res) {
    try {
        const { name , cinema_id } = req.body;
        let cinemas;
        if (name) {
            cinemas = await Cinema.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`
                    }
                }
            });
        } else if (cinema_id) {
            cinemas = await Cinema.findOne({
                where: {
                    cinema_id
                }
            });
        } else {
            cinemas = await Cinema.findAll();
        }
        if (cinemas.length === 0) {
            return respond.err(res, RESPONSE.CINEMA_NOT_FOUND);
        }
        return respond.ok(res, cinemas);
    } catch (error) {
        return respond.err(res, RESPONSE.INVALID);
    }
}

module.exports = cinemaList