/** Fungsi bantu acak */
export const R = (n: number) => Math.floor(Math.random() * n);
export const pick = <T>(a: T[]): T => a[R(a.length)];
export const rn = (a: number, b: number) => a + R(b - a + 1);
export const shuf = <T>(a: T[]): T[] =>
  a
    .map((x) => [Math.random(), x] as const)
    .sort((p, q) => p[0] - q[0])
    .map((x) => x[1]);
