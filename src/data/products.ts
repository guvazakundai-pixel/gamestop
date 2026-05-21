export interface Product {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  condition: string;
  badge?: string;
  image: string;
  specs?: string[];
  inStock: boolean;
}

export const products: Product[] = [
  { id: 'ps5-slim-new', name: 'PS5 Slim', category: 'PlayStation', categorySlug: 'playstation', price: 650, condition: 'Brand New Boxed', badge: 'HOT', image: '/images/product-01.jpeg', specs: ['1TB SSD', '4K Gaming', 'DualSense Included'], inStock: true },
  { id: 'ps5-slim-pre', name: 'PS5 Slim', category: 'PlayStation', categorySlug: 'playstation', price: 550, condition: 'Pre-owned', image: '/images/product-02.jpeg', specs: ['1TB SSD', '4K Gaming', 'DualSense Included'], inStock: true },
  { id: 'ps5-fat', name: 'PS5 Disc Edition', category: 'PlayStation', categorySlug: 'playstation', price: 500, condition: 'Pre-owned', image: '/images/product-03.jpeg', specs: ['825GB SSD', '4K Gaming', 'Backwards Compatible'], inStock: true },
  { id: 'ps5-digital', name: 'PS5 Digital Edition', category: 'PlayStation', categorySlug: 'playstation', price: 450, condition: 'Pre-owned', image: '/images/product-04.jpeg', specs: ['825GB SSD', 'Digital Only', 'No Disc Drive'], inStock: true },
  { id: 'ps4-pro', name: 'PS4 Pro', category: 'PlayStation', categorySlug: 'playstation', price: 250, condition: 'Pre-owned', image: '/images/product-05.jpeg', specs: ['1TB HDD', '4K Upscaled', 'DualShock Included'], inStock: true },
  { id: 'ps4-slim', name: 'PS4 Slim', category: 'PlayStation', categorySlug: 'playstation', price: 180, condition: 'Pre-owned', image: '/images/product-06.jpeg', specs: ['500GB HDD', '1080p Gaming', 'DualShock Included'], inStock: true },
  { id: 'ps3-super', name: 'PS3 Super Slim', category: 'PlayStation', categorySlug: 'playstation', price: 100, condition: 'Pre-owned', image: '/images/product-07.jpeg', specs: ['500GB HDD', 'Classic Gaming', 'Free Games'], inStock: true },
  { id: 'xbox-series-x', name: 'Xbox Series X', category: 'Xbox', categorySlug: 'xbox', price: 500, condition: 'Clean Pre-owned', image: '/images/product-08.jpeg', specs: ['1TB SSD', '4K Gaming', 'Game Pass Ready'], inStock: true },
  { id: 'xbox-series-s', name: 'Xbox Series S', category: 'Xbox', categorySlug: 'xbox', price: 300, condition: 'Clean Pre-owned', image: '/images/product-09.jpeg', specs: ['512GB SSD', '1440p Gaming', 'Digital Only'], inStock: true },
  { id: 'xbox-one-x', name: 'Xbox One X', category: 'Xbox', categorySlug: 'xbox', price: 220, condition: 'Pre-owned', image: '/images/product-10.jpeg', specs: ['1TB HDD', '4K Media', 'Backwards Compatible'], inStock: true },
  { id: 'xbox-one-s', name: 'Xbox One S', category: 'Xbox', categorySlug: 'xbox', price: 160, condition: 'Pre-owned', image: '/images/product-11.jpeg', specs: ['500GB HDD', '1080p Gaming', '4K Blu-ray'], inStock: true },
  { id: 'nintendo-switch-oled', name: 'Nintendo Switch OLED', category: 'Nintendo', categorySlug: 'nintendo', price: 420, condition: 'Boxed New/Mint', badge: 'POPULAR', image: '/images/product-12.jpeg', specs: ['64GB Storage', '7" OLED Screen', 'Dock Included'], inStock: true },
  { id: 'nintendo-switch-v2', name: 'Nintendo Switch V2', category: 'Nintendo', categorySlug: 'nintendo', price: 340, condition: 'Pre-owned', image: '/images/product-13.jpeg', specs: ['32GB Storage', '6.2" Screen', 'Dock Included'], inStock: true },
  { id: 'nintendo-switch-lite', name: 'Nintendo Switch Lite', category: 'Nintendo', categorySlug: 'nintendo', price: 250, condition: 'Pre-owned', image: '/images/product-14.jpeg', specs: ['32GB Storage', '5.5" Screen', 'Handheld Only'], inStock: true },
  { id: 'ps5-controller', name: 'DualSense Controller', category: 'Controllers', categorySlug: 'controllers', price: 85, condition: 'Brand New', image: '/images/product-15.jpeg', specs: ['Haptic Feedback', 'Adaptive Triggers', 'USB-C Charging'], inStock: true },
  { id: 'xbox-controller', name: 'Xbox Wireless Controller', category: 'Controllers', categorySlug: 'controllers', price: 70, condition: 'Brand New', image: '/images/product-16.jpeg', specs: ['Bluetooth', 'Textured Grip', 'AA/Rechargeable'], inStock: true },
  { id: 'ps4-controller', name: 'DualShock 4 Controller', category: 'Controllers', categorySlug: 'controllers', price: 45, condition: 'Pre-owned', image: '/images/product-17.jpeg', specs: ['Touchpad', 'Light Bar', 'Share Button'], inStock: true },
  { id: 'pro-controller', name: 'Nintendo Pro Controller', category: 'Controllers', categorySlug: 'controllers', price: 75, condition: 'Brand New', image: '/images/product-18.jpeg', specs: ['Motion Controls', 'Amiibo Support', '30hr Battery'], inStock: true },
  { id: 'airpods-pro', name: 'AirPods Pro 2', category: 'Phones & Audio', categorySlug: 'phones', price: 280, condition: 'Brand New Sealed', image: '/images/product-19.jpeg', specs: ['ANC', 'Spatial Audio', 'USB-C Case'], inStock: true },
  { id: 'airpods', name: 'AirPods 3rd Gen', category: 'Phones & Audio', categorySlug: 'phones', price: 180, condition: 'Brand New', image: '/images/product-20.jpeg', specs: ['Spatial Audio', 'MagSafe Case', '6hr Battery'], inStock: true },
  { id: 'iphone-15-pro-max', name: 'iPhone 15 Pro Max', category: 'Phones & Audio', categorySlug: 'phones', price: 880, condition: 'Pristine', badge: 'PREMIUM', image: '/images/product-21.jpeg', specs: ['256GB', 'A17 Pro Chip', 'Titanium Frame'], inStock: true },
  { id: 'iphone-15-pro', name: 'iPhone 15 Pro', category: 'Phones & Audio', categorySlug: 'phones', price: 750, condition: 'Pristine', image: '/images/product-22.jpeg', specs: ['128GB', 'A17 Pro Chip', 'Action Button'], inStock: true },
  { id: 'iphone-14-pro-max', name: 'iPhone 14 Pro Max', category: 'Phones & Audio', categorySlug: 'phones', price: 700, condition: 'Pristine', image: '/images/product-23.jpeg', specs: ['256GB', 'Dynamic Island', '48MP Camera'], inStock: true },
  { id: 'iphone-14', name: 'iPhone 14', category: 'Phones & Audio', categorySlug: 'phones', price: 480, condition: 'Excellent', image: '/images/product-24.jpeg', specs: ['128GB', 'A15 Chip', '6.1" Display'], inStock: true },
  { id: 'headset-1', name: 'Gaming Headset RGB', category: 'Accessories', categorySlug: 'accessories', price: 55, condition: 'Brand New', image: '/images/product-25.jpeg', specs: ['7.1 Surround', 'RGB Lighting', 'Retractable Mic'], inStock: true },
  { id: 'headset-2', name: 'Pro Gaming Headset', category: 'Accessories', categorySlug: 'accessories', price: 45, condition: 'Brand New', image: '/images/product-26.jpeg', specs: ['50mm Drivers', 'Memory Foam', 'Inline Controls'], inStock: true },
  { id: 'keyboard', name: 'RGB Mech Keyboard', category: 'Accessories', categorySlug: 'accessories', price: 65, condition: 'Brand New', image: '/images/product-27.jpeg', specs: ['Mechanical Switches', 'Full RGB', 'Aluminum Frame'], inStock: true },
  { id: 'mouse', name: 'Gaming Mouse RGB', category: 'Accessories', categorySlug: 'accessories', price: 35, condition: 'Brand New', image: '/images/product-28.jpeg', specs: ['16000 DPI', '7 Buttons', 'RGB Lighting'], inStock: true },
  { id: 'hdmi-cable', name: 'HDMI 2.1 Ultra Cable', category: 'Accessories', categorySlug: 'accessories', price: 25, condition: 'Brand New', image: '/images/product-29.jpeg', specs: ['4K 120Hz', '8K Ready', '2m Length'], inStock: true },
  { id: 'charging-dock', name: 'Controller Charging Dock', category: 'Accessories', categorySlug: 'accessories', price: 30, condition: 'Brand New', image: '/images/product-30.jpeg', specs: ['Dual Charging', 'LED Indicator', 'USB Powered'], inStock: true },
  { id: 'stand-ps5', name: 'PS5 Vertical Stand', category: 'Accessories', categorySlug: 'accessories', price: 20, condition: 'Brand New', image: '/images/product-31.jpeg', specs: ['Cooling Fan', 'USB Hub', 'LED Strip'], inStock: true },
  { id: 'case-ps5', name: 'PS5 Carry Case', category: 'Accessories', categorySlug: 'accessories', price: 40, condition: 'Brand New', image: '/images/product-32.jpeg', specs: ['Hard Shell', 'Foam Interior', 'Shoulder Strap'], inStock: true },
  { id: 'game-ps5-1', name: 'PS5 Game Bundle', category: 'Games', categorySlug: 'games', price: 35, condition: 'Pre-owned', badge: 'DEAL', image: '/images/product-33.jpeg', specs: ['2-3 Games', 'Disc Format', 'Case Included'], inStock: true },
  { id: 'game-ps5-2', name: 'PS5 Game Bundle', category: 'Games', categorySlug: 'games', price: 45, condition: 'Pre-owned', image: '/images/product-34.jpeg', specs: ['3-5 Games', 'Top Titles', 'Disc Format'], inStock: true },
  { id: 'game-ps4', name: 'PS4 Game Bundle', category: 'Games', categorySlug: 'games', price: 25, condition: 'Pre-owned', image: '/images/product-35.jpeg', specs: ['5-8 Games', 'Mixed Titles', 'Disc Format'], inStock: true },
  { id: 'game-xbox', name: 'Xbox Game Bundle', category: 'Games', categorySlug: 'games', price: 30, condition: 'Pre-owned', image: '/images/product-36.jpeg', specs: ['3-5 Games', 'Disc Format', 'Case Included'], inStock: true },
  { id: 'game-switch', name: 'Switch Game Bundle', category: 'Games', categorySlug: 'games', price: 40, condition: 'Pre-owned', image: '/images/product-37.jpeg', specs: ['2-3 Games', 'Cartridge', 'Case Included'], inStock: true },
  { id: 'monitor', name: '27" Gaming Monitor', category: 'Accessories', categorySlug: 'accessories', price: 350, condition: 'Pre-owned', image: '/images/product-38.jpeg', specs: ['144Hz', '1ms Response', '1080p IPS'], inStock: true },
  { id: 'vr-headset', name: 'PS VR2', category: 'PlayStation', categorySlug: 'playstation', price: 400, condition: 'Pre-owned', image: '/images/product-39.jpeg', specs: ['4K HDR', 'Eye Tracking', 'Sense Controllers'], inStock: true },
  { id: 'power-bank', name: 'Portable Power Bank', category: 'Accessories', categorySlug: 'accessories', price: 30, condition: 'Brand New', image: '/images/product-40.jpeg', specs: ['20000mAh', 'Dual USB', 'LED Display'], inStock: true },
];

export const categories = [
  { slug: 'playstation', name: 'PlayStation', icon: '🎮' },
  { slug: 'xbox', name: 'Xbox', icon: '🟢' },
  { slug: 'nintendo', name: 'Nintendo', icon: '🔴' },
  { slug: 'phones', name: 'Phones & Audio', icon: '📱' },
  { slug: 'controllers', name: 'Controllers', icon: '🕹️' },
  { slug: 'accessories', name: 'Accessories', icon: '🎧' },
  { slug: 'games', name: 'Games', icon: '💿' },
];

export const notifications = [
  { text: 'PS5 Slim just sold — Harare', time: '2m ago' },
  { text: 'iPhone 15 Pro Max traded in', time: '5m ago' },
  { text: 'Nintendo Switch OLED restocked', time: '12m ago' },
  { text: 'Xbox Series X — 3 left in stock', time: '18m ago' },
  { text: 'Controller bundle deal claimed', time: '25m ago' },
];