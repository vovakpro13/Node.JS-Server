const { dbModels: { User } } = require('../database');
const { statusCodes } = require('../constants');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await User.find({});
            res
                .status(statusCodes.OK)
                .json(users);
        } catch (err) {
            next(err);
        }
    },

    getUserById: (req, res) => {
        const { user } = req;
        res.status(statusCodes.OK).json(user);
    },

    createUser: async (req, res, next) => {
        try {
            const user = await User.create(req.body);

            res
                .status(statusCodes.CREATED)
                .json({ message: 'User is success created!', user });
        } catch (err) {
            next(err);
        }
    },

    removeUserById: async (req, res, next) => {
        const { id } = req.params;

        try {
            await User.findByIdAndDelete(id);
            res
                .status(statusCodes.DELETED)
                .json('Deleted')
                .end();
        } catch (err) {
            next(err);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const { params: { id }, body } = req;

            await User.findByIdAndUpdate(id, body, { runValidators: true, useFindAndModify: false });

            res
                .status(statusCodes.UPDATED)
                .json({ message: 'User is success updated !' });
        } catch (err) {
            next(err);
        }
    }
};
