export const formatPrice = (price: number) => {
    return `IDR${price.toLocaleString('id-ID')}`;
};