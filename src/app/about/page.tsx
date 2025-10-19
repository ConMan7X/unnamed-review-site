import Image from "next/image";

export default async function AboutPage() {
  return (
    <main className="flex flex-col items-center">
      <h1 className="text-3xl font-bold p-5">About NCSFood</h1>
      <Image
        src="/connor_nicole.jpeg"
        alt="Image of Connor and Nicole"
        width={250}
        height={250}
        className="rounded-full object-cover aspect-square mb-4"
      />
      <p className="max-w-2xl text-center mb-4">
        This website is a place where Connor and Nicole share their honest
        reviews of a variety of restaurants around Sydney and the places they
        travel.
      </p>
      <p className="max-w-2xl text-center mb-4">
        We do this mainly for fun and as a collection of our experiences and
        thoughts.
      </p>
      <p className="max-w-2xl text-center mb-4">
        Thank you for visiting our site! Follow us on Instagram!
      </p>
      <a
        className="rounded-xl hover:bg-[#FF0069]"
        href="https://www.instagram.com/ncsfoodreviews/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          className="invert"
          src="/instagram.svg"
          alt="Instagram logo"
          width={28}
          height={28}
        />
      </a>
    </main>
  );
}
