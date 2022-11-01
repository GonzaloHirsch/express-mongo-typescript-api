import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { User, IUser } from '../models/user';
import config from '../config';
import { ClientError } from '../exceptions/clientError';
import { UnauthorizedError } from '../exceptions/unauthorizedError';
import { NotFoundError } from '../exceptions/notFoundError';
import { processErrors } from '../utils/errorProcessing';
import { Error } from 'mongoose';

class AuthController {
    static login = async (req: Request, res: Response) => {
        // Check if username and password are set
        let { username, password } = req.body;
        if (!(username && password)) throw new ClientError('Username and password are required');

        // Get user from database
        const user = await User.findOne({ username: username }).exec();

        // Check if encrypted password match
        if (!user || !(await user.isPasswordCorrect(password))) {
            throw new UnauthorizedError("Username and password don't match");
        }

        // Sing JWT, valid for 1 hour
        const token = jwt.sign({ userId: user._id.toString(), username: user.username }, config.jwtSecret!, { expiresIn: '1h' });

        // Send the jwt in the response
        res.type('json').send({token: token});
    };

    static changePassword = async (req: Request, res: Response) => {
        // Get ID from JWT
        const id = res.locals.jwtPayload.userId;

        // Get parameters from the body
        const { oldPassword, newPassword } = req.body;
        if (!(oldPassword && newPassword)) throw new ClientError("Passwords don't match");

        // Get user from the database
        const user = await User.findById(id);
        if (!user) {
            throw new NotFoundError(`User with ID ${id} not found`);
        } else if (!(await user.isPasswordCorrect(oldPassword))) {
            throw new UnauthorizedError("Old password doesn't match");
        }

        // Store new pasword
        user.password = newPassword;

        try {
            // Just save, validation will happen when saving
            await user.save();
        } catch (e) {
            console.error(e)
            const error = e as Error.ValidationError;
            throw new ClientError(processErrors(error));
        }

        res.status(204).send();
    };
}
export default AuthController;
