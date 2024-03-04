import React from 'react';
import '../styles/styles.css';
import collegeLogo from '../assets/images/logo.png'

export const About = () => {
    return (
        <>
            <div className="about-container">
                {/* Background image */}
                <div className="background-image"></div>

                {/* Content */}
                <div className="content">
                    <h1>About Us</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet ultricies ligula, et gravida nisi commodo vel. Fusce ultrices magna nec quam vehicula, nec aliquam ipsum dapibus. Nullam euismod, leo id dapibus hendrerit, libero tortor consectetur ante, a scelerisque sapien neque sed purus. Duis aliquam felis nec mi malesuada, at tincidunt felis rhoncus.</p>
                    <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum in vehicula mauris. Phasellus semper luctus nibh, non congue risus gravida et. Sed convallis metus in posuere egestas. Curabitur bibendum ex ut ante ultrices, id commodo ex dapibus. Fusce non interdum nulla.</p>
                </div>
            </div>

            <div className="video-container">
                <video className="video" controls>
                    <source src="https://www.youtube.com/watch?v=2c8fFETvTvs" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* University image */}
            <div className="footer">
                <div className="college-image"></div>
                <div className="content">
                    <img className="university-image" alt="University" src={collegeLogo} />
                    <h1>UNIVERSITY AT ALBANY</h1>
                    {/* Social media icons */}
                    <div className="social-icons">
                        <i className="fab fa-facebook"></i>
                        <i className="fab fa-linkedin"></i>
                        <i className="fab fa-youtube"></i>
                    </div>
                </div>
            </div>
        </>
    );
}
