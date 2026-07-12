import React,{useEffect, useState} from "react";
import appwriteService from "../appwrite/config"
import { Container,PostCard } from "../Components";
import { Link } from "react-router-dom";

function Home() {
    const [posts,setPosts]=useState([])

    useEffect(()=>{
        appwriteService.getPosts().then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })
    },[])

    if(posts.length===0){
        return(
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return(
        <>
        <div className="text-center py-16">
    <h1 className="text-5xl font-bold text-blue-700">
        Welcome to JerryBlog
    </h1>

    <p className="mt-4 text-lg text-gray-700">
        Share your thoughts. Read inspiring stories. Connect with people.
    </p>
</div>

        <div className='w-full py-8'>
            <Container>
                <h2 className="text-3xl font-bold mb-8">
    Latest Blogs
</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.slice(0,3).map((post) => (
                        <div key={post.$id} >
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
        <div className="text-center mt-10">
    <Link to="/all-posts">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            View All Blogs →
        </button>
    </Link>
</div>
<div className="mt-20 bg-white rounded-2xl shadow-md p-10 mb-10">
    <h2 className="text-3xl font-bold mb-6 text-center">
        Why JerryBlog?
    </h2>

    <div className="grid md:grid-cols-3 gap-8 text-center ">

        <div>
            <h3 className="text-xl font-semibold">✍️ Write</h3>
            <p className="text-gray-600 mt-2">
                Create beautiful blogs with a rich text editor.
            </p>
        </div>

        <div>
            <h3 className="text-xl font-semibold">📖 Read</h3>
            <p className="text-gray-600 mt-2">
                Discover stories from different authors.
            </p>
        </div>

        <div>
            <h3 className="text-xl font-semibold">🌍 Share</h3>
            <p className="text-gray-600 mt-2">
                Share your knowledge with everyone.
            </p>
        </div>

    </div>
</div>
        </>
    )
}


export default Home