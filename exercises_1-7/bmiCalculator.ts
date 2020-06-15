interface bmiParameters {
    height: number;
    weight: number;
}

const parseBmiArguments = (args: Array<string>): bmiParameters => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
        throw new Error('Provides arguments are not numbers');
    }
    return { height: Number(args[2]), weight: Number(args[3]) };
};

const calculateBmi = (height: number, weight: number,): string => {
    const bmi = weight / Math.pow(height / 100, 2);

    const message = (bmi: number): string => {
        switch (true) {
            case bmi < 15:
                return 'Very severely underweight';
            case bmi < 16:
                return 'Severely underweight';
            case bmi < 18.5:
                return 'Underweight';
            case bmi < 25:
                return 'Normal (healthy weight)';
            case bmi < 30:
                return 'Overweight';
            case bmi < 35:
                return 'Obese Class I (Moderately obese)';
            case bmi < 40:
                return 'Obese Class II (Severely obese)';
            default:
                return 'Obese Class III (Very severely obese)';
        }
    };

    return message(bmi);
};

try {
    const { height, weight } = parseBmiArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error) {
    if (error instanceof Error) {
        console.log('Error: ', error.message);
    } else {
        throw error;
    }
}

export { calculateBmi };