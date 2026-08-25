export const mockOrders = [
  {
    id: "#ORD-123",
    customer: {
      name: "Customer",
      avatar: "https://i.pravatar.cc/150?u=1",
    },
    amount: "1,200 EGP",
    status: "Pending",
    date: "24 May 2024",
  },
  {
    id: "#ORD-124",
    customer: {
      name: "Customer",
      avatar: "https://i.pravatar.cc/150?u=2",
    },
    amount: "850 EGP",
    status: "Confirmed",
    date: "24 May 2024",
  },
  {
    id: "#ORD-125",
    customer: {
      name: "Customer",
      avatar: "https://i.pravatar.cc/150?u=3",
    },
    amount: "2,100 EGP",
    status: "Delivered",
    date: "23 May 2024",
  },
];

export const mockSalesData = [
  { date: "18 May", sales: 12000 },
  { date: "19 May", sales: 25000 },
  { date: "20 May", sales: 17000 },
  { date: "21 May", sales: 29000 },
  { date: "22 May", sales: 22000 },
  { date: "23 May", sales: 25000 },
  { date: "24 May", sales: 45000 },
];

export const mockBestSellers = [
  {
    id: 1,
    name: "Product A",
    category: "Dental Handpiece",
    sold: 124,
    image: "https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 2,
    name: "Product B",
    category: "Orthodontic Kit",
    sold: 98,
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 3,
    name: "Product C",
    category: "Mouthwash",
    sold: 76,
    image: "https://images.unsplash.com/photo-1629853925575-b9bfa85a499d?auto=format&fit=crop&w=150&q=80",
  },
];
