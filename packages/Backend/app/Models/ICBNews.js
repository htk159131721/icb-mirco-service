'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ICBNews extends Model {

	static get primaryKey () {
	    return 'id'
	}

	static get hidden () {
	    return []
	}

	static get table () {
	    return 'icb_news'
	}

	static get createdAtColumn () {
	    return 'created_at'
	}

	static get updatedAtColumn () {
	    return 'updated_at'
	}
}

module.exports = ICBNews
