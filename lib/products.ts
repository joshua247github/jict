export type Product = {
  id: string; name: string; category: string; price: number; oldPrice?: number;
  rating: number; reviews: number; badge?: string; image: string; description: string;
  stock: number; featured?: boolean;
};
export const products: Product[] = [
  { id:"p1", name:"HP 250 G9 Core i5 Laptop, 8GB RAM, 512GB SSD", category:"Laptops", price:685000, oldPrice:745000, rating:4.8, reviews:32, badge:"Deal", image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=700&q=85", description:"Reliable everyday laptop for business, study and productivity. Intel Core i5 performance, 8GB memory and fast 512GB SSD storage.", stock:12, featured:true },
  { id:"p2", name:"Wireless Bluetooth Headphones", category:"Accessories", price:28500, oldPrice:36000, rating:4.6, reviews:84, badge:"-21%", image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&q=85", description:"Comfortable wireless headphones with clear sound and long battery life.", stock:28, featured:true },
  { id:"p3", name:"Samsung Galaxy Smartphone", category:"Phones & Tablets", price:245000, oldPrice:269000, rating:4.7, reviews:51, badge:"Popular", image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700&q=85", description:"A stylish Android smartphone for work, entertainment and everyday communication.", stock:18, featured:true },
  { id:"p4", name:"Wireless Optical Mouse", category:"Accessories", price:9500, rating:4.5, reviews:116, image:"https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=700&q=85", description:"Precise wireless mouse with ergonomic design for office and home use.", stock:45 },
  { id:"p5", name:"Portable External SSD 1TB", category:"Storage", price:112000, oldPrice:125000, rating:4.9, reviews:27, badge:"Hot deal", image:"https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=700&q=85", description:"Compact high-speed portable storage for your files, photos and projects.", stock:9, featured:true },
  { id:"p6", name:"Canon PIXMA All-in-One Printer", category:"Printers", price:178000, rating:4.6, reviews:19, image:"https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=700&q=85", description:"Print, scan and copy with a compact all-in-one printer for home and office.", stock:7 },
  { id:"p7", name:"Dual Band Wi-Fi Router", category:"Networking", price:42000, oldPrice:49000, rating:4.4, reviews:43, badge:"Value pick", image:"https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=700&q=85", description:"Stable dual-band wireless connectivity for home and small office networks.", stock:21 },
  { id:"p8", name:"USB-C 7-in-1 Hub Adapter", category:"Accessories", price:23500, rating:4.7, reviews:68, image:"https://images.unsplash.com/photo-1625842268584-8f3296236761?w=700&q=85", description:"Expand your laptop connectivity with practical USB-C ports and card readers.", stock:34 },
  { id:"p9", name:"24-inch Full HD Monitor", category:"Computers", price:215000, oldPrice:238000, rating:4.8, reviews:22, image:"https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=700&q=85", description:"Crisp Full HD display for office productivity, learning and entertainment.", stock:11 },
  { id:"p10", name:"10000mAh Fast Charge Power Bank", category:"Phones & Tablets", price:18500, rating:4.5, reviews:97, badge:"Bestseller", image:"https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=700&q=85", description:"Portable power when you need it. Compact design with fast charging support.", stock:52 },
  { id:"p11", name:"Mechanical Gaming Keyboard", category:"Accessories", price:48500, oldPrice:56000, rating:4.7, reviews:39, image:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=700&q=85", description:"Responsive mechanical keys for gaming, typing and everyday computing.", stock:16 },
  { id:"p12", name:"Surge Protector Extension Socket", category:"Electronics", price:14500, rating:4.4, reviews:61, image:"https://images.unsplash.com/photo-1558008258-3256797b43f3?w=700&q=85", description:"Convenient multi-outlet power extension for your home or office setup.", stock:40 }
];
export const categories = [
  { name:"All products", icon:"▦" }, { name:"Laptops", icon:"▣" }, { name:"Phones & Tablets", icon:"▯" },
  { name:"Accessories", icon:"⌁" }, { name:"Computers", icon:"▤" }, { name:"Printers", icon:"▧" },
  { name:"Networking", icon:"⌘" }, { name:"Storage", icon:"▥" }, { name:"Electronics", icon:"⌑" }
];