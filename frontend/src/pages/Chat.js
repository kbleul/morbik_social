
import  OnlineFriends  from "../components/OnlineFriends"
import  Friends  from "../components/Friends"
import  MessageBox  from "../components/MessageBox"


const Chat = () => {
  return (
    <article className="flex">
        <section className="w-[29%] mr-[1%]">
            <OnlineFriends />
        </section>
        <section className="w-[50%] mt-from-nav shadow-2xl">
          <MessageBox />
        </section>
        <section className="w-[19%] ml-[1%]">
            <Friends />
        </section>
    </article>
  )
}

export default Chat