export interface Product {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  condition: string;
  badge?: string;
  images: string[];
  specs?: string[];
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: 'logitech-steering',
    name: 'Logitech Steering Wheel + Shifter',
    category: 'Gaming Accessories',
    categorySlug: 'steering',
    price: 450,
    condition: 'Pre-owned',
    badge: 'HOT',
    images: [
      '/images/product-01.jpeg',
      '/images/product-02.jpeg',
      '/images/product-03.jpeg',
      '/images/product-04.jpeg',
      '/images/product-06.jpeg',
      '/images/product-07.jpeg',
      '/images/product-08.jpeg',
      '/images/product-09.jpeg',
    ],
    specs: ['Force Feedback', '6-Speed Shifter', '900° Rotation', 'Pedal Set Included', 'PS5/PS4/PC Compatible', 'Clamp Mount'],
    inStock: true,
  },
  {
    id: 'xbox-series-s',
    name: 'Xbox Series S',
    category: 'Xbox',
    categorySlug: 'xbox',
    price: 300,
    condition: 'Pre-owned',
    images: [
      '/images/product-10.jpeg',
      '/images/product-11.jpeg',
      '/images/product-16.jpeg',
      '/images/product-17.jpeg',
      '/images/product-18.jpeg',
      '/images/product-19.jpeg',
      '/images/product-20.jpeg',
    ],
    specs: ['512GB SSD', '1440p Gaming', 'Digital Only', '120 FPS Support', 'Game Pass Ready', 'Backwards Compatible'],
    inStock: true,
  },
  {
    id: 'ps5-ps4-games',
    name: 'PS5 & PS4 Game Discs',
    category: 'Games',
    categorySlug: 'games',
    price: 35,
    condition: 'Pre-owned',
    badge: 'DEAL',
    images: [
      '/images/product-05.jpeg',
      '/images/product-12.jpeg',
      '/images/product-13.jpeg',
      '/images/product-14.jpeg',
      '/images/product-21.jpeg',
      '/images/product-22.jpeg',
    ],
    specs: ['Disc Format', 'Case Included', 'Mixed PS5/PS4 Titles', 'Tested & Working', 'Trade-In Welcome', 'Bundle Deals Available'],
    inStock: true,
  },
  {
    id: 'ps5-console',
    name: 'PS5 Console',
    category: 'PlayStation',
    categorySlug: 'playstation',
    price: 550,
    condition: 'Pre-owned',
    badge: 'POPULAR',
    images: [
      '/images/product-15.jpeg',
      '/images/product-23.jpeg',
      '/images/product-24.jpeg',
      '/images/product-25.jpeg',
      '/images/product-38.jpeg',
      '/images/product-39.jpeg',
      '/images/product-40.jpeg',
    ],
    specs: ['825GB SSD', '4K Gaming', 'DualSense Included', 'Ray Tracing', 'Backwards Compatible', 'Disc Edition'],
    inStock: true,
  },
  {
    id: 'nintendo-switch',
    name: 'Nintendo Switch',
    category: 'Nintendo',
    categorySlug: 'nintendo',
    price: 340,
    condition: 'Pre-owned',
    images: [
      '/images/product-26.jpeg',
      '/images/product-27.jpeg',
      '/images/product-28.jpeg',
      '/images/product-29.jpeg',
      '/images/product-30.jpeg',
      '/images/product-31.jpeg',
      '/images/product-32.jpeg',
      '/images/product-33.jpeg',
      '/images/product-34.jpeg',
      '/images/product-35.jpeg',
    ],
    specs: ['32GB/64GB Storage', 'Dock Included', 'Joy-Con Controllers', 'Portable + TV Mode', 'eShop Access', 'Cartridge Slot'],
    inStock: true,
  },
  {
    id: 'xbox-led',
    name: 'Xbox LED Sign',
    category: 'Gaming Accessories',
    categorySlug: 'steering',
    price: 120,
    condition: 'Brand New',
    images: ['/images/product-37.jpeg'],
    specs: ['LED Light', 'USB Powered', 'Wall Mount', 'RGB Colors', 'Gaming Decor', 'Xbox Branded'],
    inStock: true,
  },
];

export const categories = [
  { slug: 'playstation', name: 'PlayStation', icon: '🎮' },
  { slug: 'xbox', name: 'Xbox', icon: '🟢' },
  { slug: 'nintendo', name: 'Nintendo', icon: '🔴' },
  { slug: 'games', name: 'Games', icon: '💿' },
  { slug: 'steering', name: 'Accessories', icon: '🏁' },
];

export const notifications = [
  { text: 'PS5 Console — just sold in Harare', time: '2m ago' },
  { text: 'Xbox Series S traded in', time: '5m ago' },
  { text: 'Nintendo Switch restocked', time: '12m ago' },
  { text: 'Logitech Steering wheel — 2 left', time: '18m ago' },
  { text: 'PS5 game bundle deal claimed', time: '25m ago' },
];