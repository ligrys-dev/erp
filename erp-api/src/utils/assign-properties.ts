export const assignProperties = (target: any, source: any) => {
  for (const [key, value] of Object.entries(source)) {
    target[key] = value;
  }
};
