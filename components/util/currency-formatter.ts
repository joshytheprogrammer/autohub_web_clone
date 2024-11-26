export default function currencyFormatter(price: string | undefined | number) 
{
    const amount: number = Number(price)
    try {
      let NGN = new Intl.NumberFormat("en-NG", 
      {
        style: "currency",
        currency: "NGN",
      });
        return NGN.format(amount);
    } catch (error) {
        return "";
    }
}