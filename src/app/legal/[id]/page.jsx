"use client";
import LegalServicePage from "@/components/LegalServicePage";
import Spinner from "@/components/Spinner";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Page = () => {
  const params = useParams();
  const id = params.id;
  const router = useRouter();

  const [serviceInfo, setServiceInfo] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    const servicios = {
      "immigration-services": {
        id: "section1",
        title: "Immigration Services",
        mainTitle: "What is your legal status in México?",
        banner: "/assets/immigrationservices.jpg",
        content:
          "Multiple migratory forms or tourist cards from Mexico are a legal requirement for all non-Mexicans entering the country temporarily. These forms indicate to Mexican authorities that your stay in the country is legal and specify the number of days you can remain in Mexican territory.",
        subtitles: [
          {
            id: "subtitle1",
            title: "Visa Services",
            content:
              "Mexican attorneys offer comprehensive Visa Services, guiding clients through the intricacies of immigration processes. With expertise and personalized attention, they ensure smooth navigation of visa applications, maximizing chances of approval.",
            image: "/assets/visa.jpg",
            image2: "/assets/visa2.jpg",
          },
          {
            id: "subtitle2",
            title: "Citizenship Services",
            content:
              "Embark on your journey to Mexican citizenship with the assistance of experienced attorneys. Unlock the doors to a world of opportunities by obtaining your Mexican passport through personalized Citizenship Services tailored to your needs.",
            image: "/assets/pasaporte.jpg",
            image2: "/assets/pasaporte2.jpg",
          },
        ],
      },
      "property-regularization": {
        id: "section1",
        title: "Property Regularization",
        mainTitle: "How can I properly regularize my property?",
        banner: "/assets/propertyregularization.jpg",
        content:
          "It is essential for you to have all your paperwork in order in the event of any scenario. Property regularization is not an easy task; sometimes it can be very challenging, especially when years pass by and you have not applied for the proper legal procedures for property rights.",
        subtitles: [
          {
            id: "subtitle1",
            title: "Value Appreciation",
            content:
              "This process is a requirement in the case that you already own a property and you would like to sell it. This evaluation will determine the real price of your property, giving you an idea of how much you can negotiate with the prices.",
            image: "/assets/legal/legal-property-regularization-1.webp",
            image2: "/assets/legal/legal-property-regularization-2.webp",
          },
          {
            id: "subtitle2",
            title: "Selling your property",
            content:
              "Having your property in order allows you to sell it without any problems. We provide the services to handle all the paperwork and regularizations for you correctly.",
            image: "/assets/legal/legal-property-regularization-3.webp",
            image2: "/assets/legal/legal-property-regularization-4.webp",
          },
        ],
      },
      "property-acquisition": {
        id: "section1",
        title: "Property Acquisition",
        mainTitle: "Are you ready for Property Acquisition?",
        banner: "/assets/propertyadquisition.jpg",
        content:
          "It is important to follow the right procedure when it comes to acquiring a property for Mexicans or foreigners. We can guide you through the correct steps to ensure your acquisition, so that you and your family can enjoy your stay in Baja.",
        subtitles: [
          {
            id: "subtitle1",
            title: "House & Lease",
            content:
              "Buying homes with land lease in Baja is very common for many retired foreigners. We will ensure that your acquisition is secure for your days to come and your experience in Ensenada, Baja California.",
            image: "/assets/legal/legal-property-2.webp",
            image2: "/assets/legal/legal-property-1.webp",
          },
        ],
      },

      "court-representation": {
        id: "section1",
        title: "Litigation & Court Representation",
        mainTitle:
          "Do you know how to navigate court representation as a foreigner in Mexico?",
        banner: "/assets/courtrepresentation.jpg",
        content:
          "Being a foreigner does not exempt you from being charged with any crime, as many believe. Mexico also provides you with a public defender, but this may not yield the same results as hiring a private lawyer. Make sure you know your rights and obligations as a foreigner.",
        subtitles: [
          {
            id: "subtitle1",
            title: "Legal Representation in Mexico",
            content:
              "Navigating the Legal System: Your Rights, Options, and Considerations for Court Representation as a Foreigner in Mexico. Understanding the Process, Choosing Between Public and Private Representation, and Ensuring Fair Treatment.",
            image: "/assets/legal/legal-litigation-1.webp",
            image2: "/assets/legal/legal-poder-judicial.webp",
          },
        ],
      },
      "legal-consulting": {
        id: "section1",
        title: "Legal Consulting",
        mainTitle:
          "Are you familiar with legal consulting as a foreigner in Mexico?",
        banner: "/assets/legalconsulting.jpg",
        content:
          "As a foreigner, you may face legal issues in Mexico without exemption. While Mexico provides a public defender, opting for a private lawyer might yield more favorable outcomes. It's crucial to understand your rights and responsibilities as a foreigner.",
        subtitles: [
          {
            id: "subtitle1",
            title: "Understanding Legal Consulting in Mexico",
            content:
              "Exploring Your Legal Options: Navigating Legal Consulting as a Foreigner in Mexico. Gain insights into the process, weigh the pros and cons of public versus private consultation, and ensure you receive proper guidance.",
            image: "/assets/legal/legal-consulting-1.webp",
            image2: "/assets/legal/legal-consulting-2.webp",
          },
        ],
      },

      "formation-of-companies": {
        id: "section1",
        title: "Formation of Companies & Trust",
        mainTitle: "Navigating Business and Trust Establishment in Mexico",
        banner: "/assets/formationofcompanies.jpg",
        content:
          "Formation of companies is the legal process of establishing a new business entity. It includes registering with authorities, defining structure, drafting articles, and meeting regulatory requirements, such as determining ownership, capitalization, and governance framework.",
        subtitles: [
          {
            id: "subtitle1",
            title: "Building Trust",
            content:
              "In Mexico, forming companies involves legal registration for commercial entities. Trust formation, regulated by banking laws, administers assets for purposes like estate planning and investment.",
            image: "/assets/legal/legal-companies-1.webp",
            image2: "/assets/legal/legal-companies-2.webp",
          },
        ],
      },
      "funeral-arrangements": {
        id: "section1",
        title: "Funeral Arrangements",
        mainTitle: "Your Last Words Can Make a Difference",
        banner: "/assets/funeralarrangements.jpg",
        content:
          "PB+ provides a Last Words service. This can avoid many legal problems after your loved one's departure, ensuring all your acquisitions are in order according to Mexican laws.",
        subtitles: [
          {
            id: "subtitle1",
            title: "At the departure of your loved one",
            content:
              "As your attorneys, we will arrange all your wishes and make them official to the Mexican authorities.",
            image: "/assets/legal/legal-funeral-2.webp",
            image2: "/assets/legal/legal-funeral-1.webp",
          },
          {
            id: "subtitle2",
            title: "Funeral Services",
            content:
              "Providing all the paperwork needed in advance, we can make arrangements for you if you want transportation back to the USA",
            image: "/assets/legal/legal-funeral-4.webp",
            image2: "/assets/legal/legal-funeral-3.webp",
          },
        ],
      },

      "other-services": {
        id: "section1",
        title: "Other Legal Services",
        mainTitle: "We have the solution you need",
        banner: "/assets/otherlegalservices.jpg",
        content:
          "Our firm also offers a range of additional legal services tailored to meet your specific needs in Mexico. From business consultations to immigration assistance, we are committed to providing comprehensive legal support to ensure your peace of mind and compliance with local regulations.",
        subtitles: [
          {
            id: "subtitle1",
            title: "Expanding Your Legal Horizons in Mexico",
            content:
              "Explore a range of legal services tailored to your needs, from real estate to corporate law.",
            image: "/assets/legal/legal-other-1.webp",
            image2: "/assets/legal/legal-other-2.webp",
          },
        ],
      },
    };

    // Obtener el servicio según la ID
    const selectedService = servicios[id];
    setServiceInfo(selectedService);
  }, [id]);

  if (!serviceInfo) {
    return (
      <main className="bg-[#f5f3f4] min-h-[800px] flex items-center justify-center ">
        <div className="w-[400px] my-12 h-[400px]">
          <Spinner />
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="fixed top-16 left-12 z-50">
        <Link href="/legal">
          <button className="bg-white hover:bg-gray-200 text-gray-900 font-bold py-2 px-4 rounded-full border border-[#cba557]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline-block align-middle mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Volver
          </button>
        </Link>
      </div>
      <LegalServicePage service={serviceInfo} />
    </main>
  );
};

export default Page;
