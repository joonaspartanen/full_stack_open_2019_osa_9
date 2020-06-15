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

    let dailyExercises: Array<number>;
    let target: number;

    if ((req.body instanceof Object) && ('daily_exercises' in req.body) && ('target' in req.body)) {
        dailyExercises = req.body.daily_exercises;
        target = req.body.target;
    } else {
        return res.status(400).json({ 'error': 'parameters missing' });
    }

    if (dailyExercises === undefined || target === undefined) {
        return res.status(400).json({ 'error': 'parameters missing' });
    }

    if (!Array.isArray(dailyExercises)) {
        return res.status(400).json({ 'error': 'malformatted parameters' });
    }

    if (isNaN(Number(target)) || dailyExercises.some(isNaN)) {
        return res.status(400).json({ 'error': 'malformatted parameters' });
    }

    console.log(dailyExercises);
    console.log(target);

    const result = calculateExercises(target, dailyExercises);

    return res.send(result);
});


const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

