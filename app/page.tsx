import Banner from "@/components/home/Banner";
import Categories from "@/components/home/Categories";
import FeaturedServices from "@/components/home/FeaturedServices";
import HowItWorks from "@/components/home/HowItWorks";
import { getFeaturedServices } from "@/lib/server-api";

export default async function Home() {
  const services = await getFeaturedServices();

  return (
    <>
      <Banner />
      <FeaturedServices services={services} />
      <Categories />
      <HowItWorks />
    </>
  );
}