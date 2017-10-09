/** Shortens verbose switch statements */
export const switchy = (value, conditions) => {
  if (!conditions) throw new Error(`Invalid switch conditions object: ${conditions}`);

  const condition = conditions[value] || conditions['default'];
  if (condition) {
    if (typeof condition !== 'function') throw new Error(`Invalid switch condition function: ${condition}`);
    return condition();
  }
};
