import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../Components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    const formattedDate = post ? new Date(post.$createdAt).toLocaleDateString(
        "en-US",
        {
            day: "numeric",
            month: "long",
            year: "numeric",
        }
    ) : "";

    return post ? (
        <div className="min-h-screen bg-gray-100 py-10">
            <Container>
                <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden transition hover:shadow-3xl">
                    <div className="relative">
                        <div className="bg-gray-200 flex justify-center p-6">
                            <img
                                src={appwriteService.getFileView(post.featuredImage)}
                                alt={post.title}
                                className="max-h-125 w-auto rounded-xl shadow-lg"
                            />
                        </div>

                        {isAuthor && (
                            <div className="absolute top-5 right-5 flex gap-3">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button
                                        bgColor="bg-green-600"
                                        className="shadow-lg hover:scale-105 transition"
                                    >
                                        ✏️ Edit
                                    </Button>
                                </Link>
                                <Button
                                    bgColor="bg-red-600"
                                    className="shadow-lg hover:scale-105 transition"
                                    onClick={deletePost}
                                >
                                    🗑 Delete
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="px-10 pt-8">

                        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
                            {post.title}
                        </h1>
                        <div className="w-full mb-6">
                            <h1 className="text-4xl font-bold text-slate-800">
                                {post.title}
                            </h1>

                            <div className="flex items-center gap-3 mt-4 text-gray-600">
                                <span className="text-xl">👤</span>

                                <div>
                                    <p className="font-semibold text-gray-800">
                                        {post.author}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Published on {formattedDate}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <hr className="mx-10 my-6 border-gray-300" />
                    <div className="px-10 pb-10 pt-6 leading-8 text-gray-700 text-lg browser-css">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}