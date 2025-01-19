// находим максимальное число из всех id
export const findMaxNumId = (selectorAll: any) => {
  if (selectorAll.length === 0) return 0

  return Math.max.apply(
    null,
    Array.from(selectorAll).map((el: any) =>
      Number(el.id.replace(/[^\d]/g, '')),
    ),
  )
}
