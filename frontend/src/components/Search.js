import React from 'react'

const Search = () => {
  return (
    <div className="w-full flex items-center justify-center">
        <input type="search" value="" placeholder="Search..." className="w-10/12 mr-1 px-8 py-2 bg-slate-600 border-2 border-slate-400 rounded-full"/>

        <svg className="" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="#bbb" d="m18.677 19.607l-5.715-5.716a6 6 0 0 1-7.719-9.133a6 6 0 0 1 9.134 7.718l5.715 5.716l-1.414 1.414l-.001.001ZM9.485 5a4 4 0 1 0 2.917 1.264l.605.6l-.682-.68l-.012-.012A3.972 3.972 0 0 0 9.485 5Z"/></svg>
    </div>
  )
}

export default Search