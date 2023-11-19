export const assignProperties = (target: any, source: any) => {
  for (const [key, value] of Object.entries(source)) {
    if (typeof value === 'string' && !isNaN(Date.parse(value)))
      target[key] = new Date(value);
    else target[key] = value;
  }
};
