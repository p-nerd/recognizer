export const group_by = (obj_array: object[], key: string) => {
    const groups = {};
    for (const obj of obj_array) {
        const val = obj[key];
        if (!groups[val]) {
            groups[val] = [];
        }
        groups[val].push(obj);
    }
    return groups;
};
