import React from "react";
import { Container, Logo, LogoutBtn } from "../index.js"
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
function Header() {
    const authStatus = useSelector((state) => state.auth.status)

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true
        }, {
            name: "Login",
            slug: "/login",
            active: !authStatus
        },
        {
            name: 'Signup',
            slug: '/signup',
            active: !authStatus
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus
        }
    ]
    return (
        <header className="sticky top-0 z-50 bg-white shadow-md border-b">
            <Container>
                <nav className="flex items-center justify-between h-20">
                    <div className="flex items-center gap-3">
                        <Link to="/" className="flex items-center gap-3">
                            <Logo width="55px" />

                            <div>
                                <h1 className="text-2xl font-bold text-blue-600">
                                    JerryBlog
                                </h1>

                                <p className="text-xs text-gray-500">
                                    Share Your Ideas
                                </p>
                            </div>
                        </Link>
                    </div>
                    <ul className="flex items-center gap-2">
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <NavLink
                                        to={item.slug}
                                        className={({ isActive }) =>
                                            `inline-block px-6 py-2 rounded-full duration-200 ${isActive
    ? "bg-blue-500 text-white hover:bg-blue-400 shadow-lg "
    : "text-gray-600 hover:bg-gray-200"
                                            }`
                                        }
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Header;