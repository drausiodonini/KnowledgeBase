const bcrypt = require('bcrypt-nodejs')

module.exports = app => {

    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const user = { ...req.body }

        if (req.params.id) user.id = req.params.id

        if (!req.originalUrl.startsWith('/users')) user.admin = false

        if (!req.user || !req.user.admin) user.admin = false

        try {
            existsOrError(user.name, req.__('name-not-reported'))      // 'Nome não informado'
            existsOrError(user.email, req.__('email-not-reported'))
            existsOrError(user.password, req.__('password-not-reported'))
            existsOrError(user.confirmPassword, req.__('invalid-password-validation'))
            equalsOrError(user.password, user.confirmPassword, req.__('passwords-do-not-match'))

            const userFromDB = await app.db('users').where({ email: user.email }).first()
            if (!user.id) {
                notExistsOrError(userFromDB, req.__('user-already-registered'))
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }

        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        if (user.id) {
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .whereNull('deletedAt')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        if (req.params.id) {
            app.db('users')
                .select('id', 'name', 'email', 'admin')
                .where({ id: req.params.id }).first()
                .whereNull('deletedAt')
                .then(users => res.json(users))
                .catch(err => res.status(500).send(err))
        } else {
            app.db('users')
                .select('id', 'name', 'email', 'admin')
                .whereNull('deletedAt')
                .then(users => res.json(users))
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const articles = await app.db('articles')
                .where({ userId: req.params.id })
            notExistsOrError(articles, req.__('user-has-articles'))

            const rowsUpdate = await app.db('users')
                .update({ deletedAt: new Date() })
                .where({ id: req.params.id })
                .whereNull('deletedAt')

            existsOrError(rowsUpdate, req.__('user-not-found'))

            res.status(200).send()

        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, remove }
}