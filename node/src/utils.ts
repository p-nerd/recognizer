const format_percent = (value: number) => {
    return (value * 100).toFixed(2) + "%";
};

export const print_progress = (count: number, max: number) => {
    process.stdout.clearLine(1);
    process.stdout.cursorTo(0);

    const percent = format_percent(count / max);

    process.stdout.write(`${count}/${max} (${percent})`);
};
