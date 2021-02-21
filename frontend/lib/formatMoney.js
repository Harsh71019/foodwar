export default function formatMoney (amount = 0) {
    const options = {
        style:'currency',
        currency:'INR',
        minimumFractionDigits:0,
    };
    //Check if clean

    if(amount % 100 === 0) {
        options.minimumFractionDigits = 0;
    }

    const formatter = Intl.NumberFormat('en-IN',options);
    return formatter.format(amount)
}

