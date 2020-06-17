import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
        return res.status(400).json({ 'error': 'malformatted parameters' });
    }

    const bmi: string = calculateBmi(height, weight);

    const response = { weight, height, bmi };

    return res.json(response);
});

app.post('/exercises', (req, res) => {

    const parseDailyExercises = (object: { dailyExercises: Array<number>; }) => {
        if (!(req.body instanceof Object) || !('daily_exercises' in req.body)) {
            throw new Error('parameters missing');
        } else {
            return object.dailyExercises;
        }
    };

    const parseTarget = (object: { target: number; }): number => {
        if (!(req.body instanceof Object) || !('target' in req.body)) {
            throw new Error('parameters missing');
        } else {
            return object.target;
        }
    };

    try {
        const dailyExercises = parseDailyExercises(req.body);
        const target = parseTarget(req.body);

        if (!Array.isArray(dailyExercises)) {
            return res.status(400).json({ 'error': 'malformatted parameters' });
        }

        if (isNaN(Number(target)) || dailyExercises.some(isNaN)) {
            return res.status(400).json({ 'error': 'malformatted parameters' });
        }

        if (dailyExercises.length === 0) {
            return res.status(400).json({ 'error': 'malformatted parameters' });
        }

        const result = calculateExercises(target, dailyExercises);

        return res.send(result);
    } catch (error) {
        return res.status(400).send((error as Error).message);
    }

});


const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

