'use strict';

import express from 'express';
import passport from 'passport';
import {signToken} from '../auth.service';
var OAuth = require('./oauth');
// var client = new OAuth('wx59ce4f19ba887044', 'wybHugEwzTMOeVooYt-gCYq4vDdnT5kd0MoE8-cIjU_fvRSm540I3Vg_oyz8taBX');
var client = new OAuth('XXXXXXXXXXXXXX', 'XXXXXXXXXXXXXXXX');

var router = express.Router();

router.get('/', function(req ,res) {
  client.getUserByCode(req.query.code, function (err, result) {
    if(err){
      console.log('------  getUserByCode err -----')
      console.log(err);
      return res.status(500).json(err);
    }
    console.log(result);
    return res.status(200).json(result);
  });
});

export default router;
