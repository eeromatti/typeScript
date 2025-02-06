import express from 'express';
import diagnosesService from '../services/diagnosesService';
import { Response } from 'express';
import { Diagnoses } from '../types';

const router = express.Router();

router.get('/', (_req, res: 
  Response<Diagnoses[]>) => {
  res.send(diagnosesService.getDiagnoses());
});

export default router;