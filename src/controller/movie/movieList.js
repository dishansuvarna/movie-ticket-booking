const { Op, Sequelize } = require('sequelize')
const Movie = require('../../models/movies')
const { respond } = require('../../../helper')
const { RESPONSE } = require('../../../config')

async function movieList(req, res) {
    try {
      const { movie_name } = req.body;
      let movies;
      if (movie_name) {
        movies = await Movie.findAll({
          where: {
            movie_name: {
              [Op.like]: `%${movie_name}%`
            } ,
            release_date: {
              [Op.gte]: Sequelize.DATE(new Date())
            }
          } ,
          order: [
            ["release_date" , "ASC"]
          ]
        });
      } else {
        movies = await Movie.findAll({
          where: {
            release_date: {
              [Op.gte]: Sequelize.DATE(new Date())
            }
          } ,
          order: [
            ["release_date" , "ASC"]
          ]
        });
      }
      if (movies.length === 0) {
        return respond.err(res, RESPONSE.MOVIE_NOT_FOUND);
      }
      return respond.ok(res, movies);
    } catch (error) {
      return respond.err(res, RESPONSE.INVALID);
    }
}

module.exports = movieList