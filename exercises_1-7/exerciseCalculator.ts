interface ExerciseSummary {
    periodLength: number;
    trainingDays: number;
    target: number;
    average: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
}

interface ExerciseArguments {
    target: number;
    exerciseAmounts: Array<number>;
}

const parseExerciseArguments = (args: Array<string>): ExerciseArguments => {
    if (args.length < 4) {
        throw new Error('Too few arguments');
    }

    const exerciseArguments = args.splice(2);

    const argumentsAsNumbers = exerciseArguments.map((arg: string) => {
        if (isNaN(Number(arg))) {
            throw new Error('Provided arguments are not numbers');
        } else {
            return Number(arg);
        }
    });

    const target = argumentsAsNumbers[0];
    const exerciseAmounts = argumentsAsNumbers.splice(1);

    return { target, exerciseAmounts };
};

const calculateExercises = (target: number, exerciseAmounts: Array<number>): ExerciseSummary => {
    const periodLength = exerciseAmounts.length;
    const trainingDays = exerciseAmounts.filter((dailyHours: number) => dailyHours !== 0).length;
    const average = exerciseAmounts.reduce((sum: number, value: number): number => {
        return sum + value;
    }, 0) / periodLength;
    const success = average >= target;

    let rating: number;
    if (average - target > 1) {
        rating = 3;
    } else if (average - target < -1) {
        rating = 1;
    } else {
        rating = 2;
    }

    let ratingDescription: string;
    if (rating === 1) {
        ratingDescription = 'This is not enough. You should try more!';
    } else if (rating === 2) {
        ratingDescription = 'Quite well, but you could do better!';
    } else {
        ratingDescription = 'Well done! But can you do even better next time?';
    }

    return { periodLength, trainingDays, success, rating, ratingDescription, target, average };
};

try {
    const { target, exerciseAmounts } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(target, exerciseAmounts));
} catch (error) {
    if (error instanceof Error) {
        console.log('Error: ', error.message);
    } else {
        throw error;
    }
}

export { calculateExercises };