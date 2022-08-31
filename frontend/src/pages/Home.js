import Hero from "../components/Hero"


const Home = () => {
  return (<main>
    <article className="mt-from-nav relative">
     <Hero />
    </article>
    <section className="bg-slate-200">
    <div className="flex font-content-spliter">

      <div className="w-30%">
        <p className="font-bold">200 <span className="text-sm">Following</span></p>
        <p className="font-bold">1200 <span className="text-sm">Followers</span></p>
      </div>
      
      <p className="w-[70%]">Posts</p>
    </div>
   </section>
   </main>
  )
}

export default Home

//
