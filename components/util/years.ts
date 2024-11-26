export const Years = () => 
{
    const currentYear = new Date().getFullYear();
    const endYear = Math.max(currentYear, 2023);
    const years: string[] = [];

    for (let year = 1990; year <= endYear; year++) 
    {
      years.push(year.toString());
    }
    return years.toReversed();
}