import { Order } from '../types';
import { INITIAL_PRODUCTS } from './mockProducts';

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-2026-9812',
    userId: 'user-101',
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        selectedColor: INITIAL_PRODUCTS[0].colors[0],
        selectedSize: 'L',
        quantity: 1
      },
      {
        product: INITIAL_PRODUCTS[1],
        selectedColor: INITIAL_PRODUCTS[1].colors[0],
        selectedSize: '32',
        quantity: 1
      }
    ],
    shippingAddress: {
      id: 'addr-101',
      name: 'Alex Rivera',
      phone: '+91 98765 43210',
      street: '402 Skyline Towers, MG Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560001',
      isDefault: true
    },
    paymentMethod: 'UPI',
    subtotal: 4398,
    discountAmount: 879,
    shippingFee: 0,
    taxAmount: 211,
    totalAmount: 3730,
    couponCode: 'STYLESMRT20',
    status: 'Delivered',
    createdAt: '2026-02-06T14:32:00Z',
    estimatedDeliveryDate: '2026-02-09',
    trackingNumber: 'TRK-98124401',
    courierPartner: 'BlueDart Express',
    deliveryAgent: {
      name: 'Ramesh Kumar',
      phone: '+91 98123 45678',
      vehicleNumber: 'KA-01-EQ-4492',
      deliveryPin: '4829'
    },
    trackingSteps: [
      { title: 'Order Placed & Confirmed', description: 'Payment verified via UPI', timestamp: '06 Feb 2026, 02:32 PM', location: 'StyleSmart HQ System', completed: true },
      { title: 'AI Quality Check & Packed', description: 'Inspected for size & fabric defects', timestamp: '07 Feb 2026, 09:15 AM', location: 'Bengaluru Fulfilment Center', completed: true },
      { title: 'In Transit', description: 'Dispatched with BlueDart Express', timestamp: '08 Feb 2026, 04:20 PM', location: 'MG Road Logistics Hub', completed: true },
      { title: 'Out for Delivery', description: 'Assigned to Ramesh Kumar', timestamp: '09 Feb 2026, 08:30 AM', location: 'Central Bengaluru Zone', completed: true },
      { title: 'Delivered', description: 'Handed to customer (OTP Verified)', timestamp: '09 Feb 2026, 11:45 AM', location: '402 Skyline Towers', completed: true }
    ],
    returnRequests: [
      {
        id: 'RET-2026-1029',
        orderId: 'ORD-2026-9812',
        productId: INITIAL_PRODUCTS[1].id,
        itemTitle: INITIAL_PRODUCTS[1].title,
        itemColorHex: INITIAL_PRODUCTS[1].colors[0].hex,
        itemColorName: INITIAL_PRODUCTS[1].colors[0].name,
        itemSize: '32',
        itemImage: INITIAL_PRODUCTS[1].images[0],
        reason: 'Size too tight around waist',
        details: 'The denim waist fit is slightly tighter than expected. Requesting size 34 exchange.',
        requestedAction: 'exchange_size',
        exchangeSize: '34',
        refundPreference: 'store_credit',
        pickupAddress: {
          id: 'addr-101',
          name: 'Alex Rivera',
          phone: '+91 98765 43210',
          street: '402 Skyline Towers, MG Road',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560001'
        },
        pickupDate: '2026-08-11',
        pickupTimeSlot: '10:00 AM - 01:00 PM',
        status: 'Pickup Scheduled',
        createdAt: '2026-08-09T10:00:00Z',
        refundAmount: 2499
      }
    ]
  },
  {
    id: 'ORD-2026-9813',
    userId: 'user-102',
    items: [
      {
        product: INITIAL_PRODUCTS[2],
        selectedColor: INITIAL_PRODUCTS[2].colors[0],
        selectedSize: 'M',
        quantity: 2
      }
    ],
    shippingAddress: {
      id: 'addr-102',
      name: 'Sneha Patel',
      phone: '+91 99887 76655',
      street: '75 Park Avenue, Koramangala',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560034'
    },
    paymentMethod: 'Card',
    subtotal: 2598,
    discountAmount: 0,
    shippingFee: 99,
    taxAmount: 130,
    totalAmount: 2827,
    status: 'Shipped',
    createdAt: '2026-02-07T09:15:00Z',
    estimatedDeliveryDate: '2026-08-10',
    trackingNumber: 'TRK-98135512',
    courierPartner: 'Delhivery Surface',
    deliveryAgent: {
      name: 'Vikram Singh',
      phone: '+91 97722 11002',
      vehicleNumber: 'KA-05-MH-8812',
      deliveryPin: '9103'
    },
    trackingSteps: [
      { title: 'Order Placed & Confirmed', description: 'Card Payment Approved', timestamp: '07 Feb 2026, 09:15 AM', location: 'StyleSmart HQ', completed: true },
      { title: 'AI Quality Check & Packed', description: 'Barcode scanned & sealed', timestamp: '07 Feb 2026, 02:40 PM', location: 'Hosur Road Warehouse', completed: true },
      { title: 'In Transit', description: 'Arrived at Koramangala Sorting Hub', timestamp: '08 Feb 2026, 11:10 PM', location: 'Koramangala Hub', completed: true, current: true },
      { title: 'Out for Delivery', description: 'Scheduled for delivery today', timestamp: 'Expected 10 Aug 2026', location: 'Local Courier Van', completed: false },
      { title: 'Delivered', description: 'Pending delivery confirmation', timestamp: 'Expected 10 Aug 2026', location: 'Destination Address', completed: false }
    ]
  },
  {
    id: 'ORD-2026-9814',
    userId: 'user-103',
    items: [
      {
        product: INITIAL_PRODUCTS[3],
        selectedColor: INITIAL_PRODUCTS[3].colors[0],
        selectedSize: 'UK 9',
        quantity: 1
      }
    ],
    shippingAddress: {
      id: 'addr-103',
      name: 'Vikramaditya Rao',
      phone: '+91 91234 56789',
      street: '12 Jubilee Hills, Road No. 36',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500033'
    },
    paymentMethod: 'NetBanking',
    subtotal: 3999,
    discountAmount: 750,
    shippingFee: 0,
    taxAmount: 195,
    totalAmount: 3444,
    couponCode: 'FIRST100',
    status: 'Processing',
    createdAt: '2026-08-08T11:45:00Z',
    estimatedDeliveryDate: '2026-08-11',
    trackingNumber: 'TRK-98146623',
    courierPartner: 'DTDC Premium Express',
    trackingSteps: [
      { title: 'Order Placed & Confirmed', description: 'NetBanking Payment Verified', timestamp: '08 Aug 2026, 11:45 AM', location: 'StyleSmart HQ', completed: true, current: true },
      { title: 'Quality Check & Packing', description: 'Preparing items for shipping', timestamp: 'In Progress', location: 'Hyderabad Hub', completed: false },
      { title: 'In Transit', description: 'Awaiting courier dispatch', timestamp: 'Pending', location: 'DTDC Express', completed: false },
      { title: 'Out for Delivery', description: 'Awaiting dispatch', timestamp: 'Pending', location: 'Local Hub', completed: false },
      { title: 'Delivered', description: 'Pending delivery', timestamp: 'Pending', location: 'Jubilee Hills', completed: false }
    ]
  },
  {
    id: 'ORD-2026-9815',
    userId: 'user-104',
    items: [
      {
        product: INITIAL_PRODUCTS[4],
        selectedColor: INITIAL_PRODUCTS[4].colors[0],
        selectedSize: 'S',
        quantity: 1
      },
      {
        product: INITIAL_PRODUCTS[5],
        selectedColor: INITIAL_PRODUCTS[5].colors[0],
        selectedSize: 'Free Size',
        quantity: 1
      }
    ],
    shippingAddress: {
      id: 'addr-104',
      name: 'Ananya Deshmukh',
      phone: '+91 98111 22334',
      street: '88 Bandra Reclamation',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050'
    },
    paymentMethod: 'COD',
    subtotal: 5198,
    discountAmount: 1000,
    shippingFee: 0,
    taxAmount: 250,
    totalAmount: 4448,
    couponCode: 'AIFESTIVE30',
    status: 'Pending',
    createdAt: '2026-02-08T18:20:00Z',
    estimatedDeliveryDate: '2026-02-12',
    trackingNumber: 'TRK-98157734'
  },
  {
    id: 'ORD-2026-9816',
    userId: 'user-105',
    items: [
      {
        product: INITIAL_PRODUCTS[1],
        selectedColor: INITIAL_PRODUCTS[1].colors[0],
        selectedSize: '30',
        quantity: 1
      }
    ],
    shippingAddress: {
      id: 'addr-105',
      name: 'Karan Mehra',
      phone: '+91 97654 32109',
      street: '14 Vasant Vihar',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110057'
    },
    paymentMethod: 'UPI',
    subtotal: 2499,
    discountAmount: 0,
    shippingFee: 0,
    taxAmount: 125,
    totalAmount: 2624,
    status: 'Cancelled',
    createdAt: '2026-02-05T16:10:00Z',
    estimatedDeliveryDate: '2026-02-08',
    trackingNumber: 'TRK-98168845'
  }
];

export const SALES_TREND_DATA = [
  { label: 'Feb 01', revenue: 42500, orders: 14, avgOrder: 3035 },
  { label: 'Feb 02', revenue: 58200, orders: 19, avgOrder: 3063 },
  { label: 'Feb 03', revenue: 51000, orders: 16, avgOrder: 3187 },
  { label: 'Feb 04', revenue: 69400, orders: 23, avgOrder: 3017 },
  { label: 'Feb 05', revenue: 84100, orders: 28, avgOrder: 3003 },
  { label: 'Feb 06', revenue: 92300, orders: 31, avgOrder: 2977 },
  { label: 'Feb 07', revenue: 112000, orders: 38, avgOrder: 2947 },
  { label: 'Feb 08', revenue: 128500, orders: 42, avgOrder: 3059 }
];

export const CATEGORY_SALES_DATA = [
  { name: 'Men', revenue: 184500, percentage: 38, color: '#6366f1' },
  { name: 'Footwear', revenue: 121000, percentage: 25, color: '#8b5cf6' },
  { name: 'Women', revenue: 92400, percentage: 19, color: '#ec4899' },
  { name: 'Accessories', revenue: 53500, percentage: 11, color: '#06b6d4' },
  { name: 'Beauty', revenue: 34000, percentage: 7, color: '#f59e0b' }
];
