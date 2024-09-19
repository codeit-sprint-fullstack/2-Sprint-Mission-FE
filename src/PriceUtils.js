export default function PriceUtils(p) {
  if (typeof p !== 'number') return 'NaN';
  return p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}