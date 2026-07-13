import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from '..'
import appwriteService from "../../appwrite/config"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',

        }
    })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const submit = async (data) => {
        if (post) {
            const file = data.image?.[0] ? await appwriteService.uploadFile(data.image[0]) : null
            if (file) {
                appwriteService.deleteFile(post.featuredImage)
            }
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : post.featuredImage,
            })
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            } else {
                alert("Appwrite Error: Could not update the post. Check your browser console for details.");
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0])
            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id,
                    author: userData.name

                })
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z0-9\s]/g, "")
                .replace(/\s+/g, "-");
        }

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title' ) {
                setValue('slug', slugTransform(value.title), { shouldValidate: true })
            }
        })

        return () => {
            subscription.unsubscribe()
        }

    }, [watch, slugTransform, setValue])

    return (
        <>
            <div className="mb-8 ml-2">

                <h1 className="text-4xl font-bold">
                    Create New Post
                </h1>

                <p className="text-gray-600 mt-2">
                    Share your thoughts with the world.
                </p>

            </div>
            <form onSubmit={handleSubmit(submit)} className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
                    <label className="block text-gray-700 font-semibold mb-2">
                        <Input
                            label="Title :"
                            placeholder="Title"
                            className="mb-4"
                            {...register("title", { required: true })}
                        />
                    </label>

                    <label className="block text-gray-700 font-semibold mb-2">
                        <Input
                            label="Slug :"
                            placeholder="Slug"
                            className="mb-4"
                            {...register("slug", { required: true })}
                            onInput={(e) => {
                                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                            }}
                        />
                    </label>

                    <label className="block text-gray-700 font-semibold mb-2">

                        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                    </label>

                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-24">
                    <Input
                        label="Featured Image :"
                        type="file"
                        className="mb-4 
                        file:bg-blue-600
                        file:py-1
                        file:px-2
                        file:m-1
                        file:text-white
                        file:rounded-lg
                        file:cursor-pointer
                        file:hover:bg-blue-300"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                    {post && (
                        <div className="w-full mb-4">
                            <div className="px-1 py-1">Current Image :</div>
                            <img
                                src={appwriteService.getFileView(post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg"
                            />
                        </div>
                    )}
                    <div className="p-1">Status :</div>
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="mb-4"
                        {...register("status", { required: true })}
                    />
                    <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                        {post ? "Update" : "Submit"}
                    </Button>
                </div>
            </form>
        </>
    );
}

export default PostForm