import Post from "../components/Post"

const Feed = () => {
  return (
    <article>

        <section className="mt-from-nav ">
            <Post />
            <div className="font-content-spliter flex justify-center text-2xl text-center">
                <p className="mt-8 w-1/2">My Feed</p>
                <p className="mt-8 w-1/2">Suggested</p>
            </div>
        </section>

    </article>
  )
}

export default Feed