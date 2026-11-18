import Banner from "@/components/home/Banner";
import Categories from "@/components/home/Categories";
import FeaturedServices from "@/components/home/FeaturedServices";
import HowItWorks from "@/components/home/HowItWorks";
import { dummyServices } from "@/lib/dummy-data";

export default function Home() {
  return (
    <>
      <Banner />
      <FeaturedServices services={dummyServices} />
      <Categories />
      <HowItWorks />
    </>
  );
}