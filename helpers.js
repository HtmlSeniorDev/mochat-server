/**
 * Сортировка по полю
 * @param field
 * @returns {function(*, *): number}
 */
function byField(field) {
  return (a, b) => a[field] > b[field] ? 1 : -1;
}

exports.byField = byField;