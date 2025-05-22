import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth()

  // Protect the route by checking if the user is signed in
  if (!userId) {
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[36px] row-start-2 items-center sm:items-start">
          <h1 className="text-4xl font-bold">Welcome to Goodie Bag</h1>
          <p className="text-lg">Your one-stop shop for all things candy!</p>
          <p className="text-lg">Sign in or continue as guest.</p>
        </main>
      </div>
    );
  }

    return (
      <div className="bg-[url('/CandyMix2.png')] bg-cover bg-no-repeat bg-center grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[36px] row-start-2 items-center sm:items-start">
          <div className="bg-black p-6 rounded">
            <h1 className="text-5xl font-bold text-white">Welcome to Goodie Bag</h1>
            <p className="text-2xl text-white">Your one-stop shop for all things candy!</p>
          </div>
        </main>
      </div>
    );
}
