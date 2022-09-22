const io = require("socket.io")(8900, {
    cors : {  origin : "http://localhost:3000",   }
})

let users = []

const addUser = ( userId , socketId ) => {
    !users.some(user => user.userId === userId) && 
        users.push( { userId , socketId })
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

const getUser = userId => {
    const temp =  users.find(user => user.userId === userId)
    console.log(temp)
     return temp
}

io.on("connection", (socket) => { 
    console.log("user connected")

    
    //take userid and socket id from user
    socket.on("addUser", userId => {
        addUser(userId , socket.id)
        io.emit("getUsers" , users)
     //   io.emit("getOnlineUsers")
        console.log(users.length)
    })

    //send and get message
    socket.on("sendMessage",  (doc) => {
        const user = getUser(doc.receiverId)

        io.to(user?.socketId).emit("getMessage", { senderId : doc.senderId , text : doc.text } )
        console.log("sent message")
    })



    socket.on("disconnect", (socket) => { 
        console.log("user disconnected")
            removeUser(socket.id)
            io.emit("getUsers" , users)
    })
})

