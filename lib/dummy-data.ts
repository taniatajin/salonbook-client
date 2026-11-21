import type { Service } from "./types";

// public/images/services/ folder-er chhobi
const local = (name: string) => `/images/services/${name}.jpg`;


// Temporary: server API ready hole eta bad dibo
export const dummyServices: Service[] = [
  { _id: "1", serviceName: "Classic Haircut & Style", category: "Haircut & Styling", description: "Precision cut and blow-dry styled to suit your face shape and lifestyle.", price: 25, duration: 45, image: local("haircut"), status: "active" },
  { _id: "2", serviceName: "Global Hair Coloring", category: "Hair Coloring", description: "Full-head colour using ammonia-free products for a rich, even finish.", price: 60, duration: 120, image: local("hair-coloring"), status: "active" },
  { _id: "3", serviceName: "Keratin Hair Treatment", category: "Hair Treatment", description: "Smoothing treatment that reduces frizz and leaves hair silky for weeks.", price: 80, duration: 150, image: local("keratin"), status: "active" },
  { _id: "4", serviceName: "Hydrating Facial", category: "Facial & Skincare", description: "Deep cleansing and moisturising facial for fresh, glowing skin.", price: 40, duration: 60, image: local("facial"), status: "active" },
  { _id: "5", serviceName: "Bridal Makeup", category: "Makeup", description: "Long-lasting bridal makeup with trial consultation and finishing touches.", price: 120, duration: 90, image: local("makeup"), status: "active" },
  { _id: "6", serviceName: "Gel Manicure & Pedicure", category: "Manicure & Pedicure", description: "Nail shaping, cuticle care and long-wear gel polish for hands and feet.", price: 35, duration: 75, image: local("mani-pedi"), status: "active" },
  { _id: "7", serviceName: "Relaxing Body Massage", category: "Spa & Massage", description: "Full-body massage to release tension and restore calm.", price: 50, duration: 60, image: local("massage"), status: "inactive" },
];