export const shortenAddress = (address) => {
    if (address && address.length > 10) {
        return address.substr(0, 5) + "..." + address.substr(-5);
    } else {
        return "Not Connected";
    }
};
