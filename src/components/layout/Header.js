import { Link } from "react-router-dom";

const Header = () => {

    return (
        <>
            {/* <header id="identity">
                <div className="logo">
                    <a href="index.html" className="logo-link" rel="home"> <img src="images/logo.png" className="logo" alt="" /> </a>
                </div>
            </header> */}
            <div id="site-menu">
                <nav className="nav-menu">
                    <ul>
                        <li className="menu-item current-menu-item"><Link to="/">Home</Link></li>
                        <li className="menu-item"><Link to="/resume">Resume</Link></li>
                        <li className="menu-item"><Link to="/portfolio">Portfolio</Link></li>
                        {/* <li className="menu-item menu-item-has-children"><a href="blog.html">Blog</a>
                            <a href="index.html#" className="menu-expand mdi"></a>
                            <ul className="sub-menu">
                                <li className="menu-item"><a href="post.html">Post</a></li>
                                <li className="menu-item menu-item-has-children"> <a href="#">Submenu - 1</a>
                                    <a href="index.html#" className="menu-expand mdi"></a>
                                    <ul className="sub-menu">
                                        <li className="menu-item"><a href="#">Submenu - 2</a></li>
                                        <li className="menu-item"><a href="#">Submenu - 2</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li> */}
                        <li className="menu-item"><Link to="/contact">Contact</Link></li>
                    </ul>
                </nav>
            </div>
            <div className="menu-overlay"></div><div className="site-menu-toggle">
                <a href="about.html#site-menu" className="ti"> <span className="screen-reader-text">Toggle navigation</span> </a>
            </div>
        </>
    )
}
export default Header;