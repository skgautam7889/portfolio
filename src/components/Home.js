import { getDefaultNormalizer } from "@testing-library/react";

const Home = () => {
    const profile_title = "Full Stack Developer";
    const name = "Suraj Kumar";
    const dob = "10th Aug. 1999";
    const email = 'surajkumargautam7889@gmail.com';
    return (
        <>
            <div className="content-wrap clearfix">
                <div className="mccan page">
                    <h3 className="title-small">{profile_title}</h3>
                    <h2 className="title">{name}</h2>
                    <div className="content">
                        <div className="grid-container">
                            <div className="grid-column">
                                <p>Hi, My name is Rory McCan. I am a Web Designer, and etiam accumsan scelerisque rhoncus. Nulla
                                    quis laorey velit drana. Pelteqle quisu velleopha retra congue. Nulla quis laoreet velit.
                                    Pelteqle quisu velleopha retra congue. Lorem ipsum nolan sithe cons eturadip liscing elit.
                                    Donec hendrerit sapien coner the consequat erose viverra at. Quality quis laorey velit.
                                    Pelteqle quisu velleopha retra the congue.</p>
                                <div className="row">
                                    <div className="col-md-4">
                                        <p><b>Birthday:</b> {dob}</p>
                                        <p><b>Website:</b> www.mccan.com</p>
                                        <p><b>Phone:</b> +1 123-000-4444</p>
                                    </div>
                                    <div className="col-md-4">
                                        <p><b>Degree:</b> Master</p>
                                        <p><b>Mail:</b> {email}</p>
                                        <p><b>Linkedin:</b> /rorymccan</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="divider1"></div>
                <div className="mccan page">
                    <h3 className="title-small">What I Do</h3>
                    <h2 className="title">Services</h2>
                    <div className="content">
                        <div className="grid-container">
                            <div className="grid-column">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="feature feature-left">
                                            <div className="mccan-icon"> <span className="et-telescope font-35px"></span> </div>
                                            <div className="mccan-text">
                                                <h3>Web Desing</h3>
                                                <p>Fusce suscipit, ante a hendrerit thelery ullamcorper vivense comtersa risus
                                                    nisl cursus nurus the viverra ante nulla.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="feature feature-left">
                                            <div className="mccan-icon"> <span className="et-lightbulb font-35px"></span> </div>
                                            <div className="mccan-text">
                                                <h3>Development</h3>
                                                <p>Fusce suscipit, ante a hendrerit thelery ullamcorper vivense comtersa risus
                                                    nisl cursus nurus the viverra ante nulla.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="feature feature-left">
                                            <div className="mccan-icon"> <span className="et-camera font-30px"></span></div>
                                            <div className="mccan-text">
                                                <h3>Photography</h3>
                                                <p>Fusce suscipit, ante a hendrerit thelery ullamcorper vivense comtersa risus
                                                    nisl cursus nurus the viverra ante nulla.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="feature feature-left">
                                            <div className="mccan-icon"> <span className="et-presentation font-35px"></span> </div>
                                            <div className="mccan-text">
                                                <h3>Marketing</h3>
                                                <p>Fusce suscipit, ante a hendrerit thelery ullamcorper vivense comtersa risus
                                                    nisl cursus nurus the viverra ante nulla.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="feature feature-left">
                                            <div className="mccan-icon"> <span className="et-mobile font-35px"></span></div>
                                            <div className="mccan-text">
                                                <h3>Fully Responsive</h3>
                                                <p>Fusce suscipit, ante a hendrerit thelery ullamcorper vivense comtersa risus
                                                    nisl cursus nurus the viverra ante nulla.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="feature feature-left">
                                            <div className="mccan-icon"> <span className="et-layers font-35px"></span> </div>
                                            <div className="mccan-text">
                                                <h3>Art Direction</h3>
                                                <p>Fusce suscipit, ante a hendrerit thelery ullamcorper vivense comtersa risus
                                                    nisl cursus nurus the viverra ante nulla.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copyright">
                    <p>&copy; 2022 <a href="index.html">McCan</a>. All Rights Reserved.</p>
                </div>
            </div>
            <div className="additional-menu-content">
                <h3 className="title-small">Web Designer</h3>
                <h2 className="title">Rory McCan</h2> <img src="images/about.png" alt="" />
                <p>Hi, My name is Rory McCan. I am a Web Designer, and etiam accumsan scelerisque rhoncus. Nulla quis laoreet
                    velit. Pelteqle quisu velleopha retra congue.</p> <a href="#" className="btn">Hire Me</a>
                <div className="divider2"></div>
                <h3 className="title-small">@rorymccan</h3>
                <h2 className="title">Instagram</h2>
                <div className="sb-widget fl-wrap">
                    <div className="insta-thumb">
                        <a href="#"><img src="images/insta/01.jpg" alt="" /></a>
                        <a href="#"><img src="images/insta/02.jpg" alt="" /></a>
                        <a href="#"><img src="images/insta/03.jpg" alt="" /></a>
                        <a href="#"><img src="images/insta/04.jpg" alt="" /></a>
                        <a href="#"><img src="images/insta/05.jpg" alt="" /></a>
                        <a href="#"><img src="images/insta/06.jpg" alt="" /></a>
                    </div>
                </div>
            </div>
            {/* <div className="my-info">
                <div className="box">
                    <div className="field field-my-info field-separator">
                        <h6>Location</h6>
                        <p>California, USA</p>
                    </div>
                    <div className="field field-my-info field-separator">
                        <h6>E-Mail</h6>
                        <p>info@mccan.com</p>
                    </div>
                    <div className="field field-my-info field-separator">
                        <h6>Phone</h6>
                        <p>+1 123 000 4444</p>
                    </div>
                    <div className="clear"></div>
                    <button type="submit" className="button-color"><span className="ti-download"></span> DOWNLOAD CV</button>
                </div>
            </div> */}
        </>
    )
}
export default Home;