'use strict';

import express from 'express';
import passport from 'passport';
import config from '../config/environment';
import User from '../api/user/user.model';

// Passport Configuration
require('./local/passport').setup(User, config);
require('./wechat/wechat').setupWeixin();

var router = express.Router();

router.use('/local', require('./local'));
router.use('/wechat', require('./wechat'));

export default router;
