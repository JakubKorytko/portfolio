import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center text-[var(--primary)] text-5xl">
      <Image
        src={"/images/construction.png"}
        alt={"Under Construction"}
        width={512}
        height={512}
        style={{
          maxWidth: "50%",
        }}
      />
      <h1 className="mt-4">Under Construction</h1>
      <p className="text-lg text-center max-w-md mt-12">
        This portfolio is currently under construction. Please check back later!
      </p>
      <p className="text-base text-center max-w-md mt-4">
        Or navigate to the old version of the portfolio at{" "}
        <Link
          href="https://old.korytko.dev"
          className="text-[var(--primary-bold)]"
        >
          https://old.korytko.dev
        </Link>
      </p>
    </main>
  );
}
