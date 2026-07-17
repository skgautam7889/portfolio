// src/components/analytics/VisitorTracker.jsx

import { useEffect } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import db from './../firebase/firestore';
const VisitorTracker = () => {
    useEffect(() => {
        const trackVisitor = async () => {
           
            try {
                // Prevent duplicate save in same browser session
                const tracked = sessionStorage.getItem("visitor_tracked");
                console.log("tracked==>", tracked)
                if (tracked) {
                    // return;
                }

                // Generate Session ID
                const sessionId =
                    localStorage.getItem("visitor_session") ||
                    crypto.randomUUID();

                localStorage.setItem("visitor_session", sessionId);

                // Browser Information
                const userAgent = navigator.userAgent;

                let browser = "Unknown";

                if (userAgent.includes("Edg")) browser = "Edge";
                else if (userAgent.includes("Chrome")) browser = "Chrome";
                else if (userAgent.includes("Firefox")) browser = "Firefox";
                else if (userAgent.includes("Safari")) browser = "Safari";
                else if (userAgent.includes("Opera")) browser = "Opera";

                let os = "Unknown";

                if (userAgent.includes("Windows")) os = "Windows";
                else if (userAgent.includes("Mac")) os = "macOS";
                else if (userAgent.includes("Android")) os = "Android";
                else if (userAgent.includes("iPhone")) os = "iPhone";
                else if (userAgent.includes("Linux")) os = "Linux";

                const device =
                    /Mobi|Android|iPhone/i.test(userAgent)
                        ? "Mobile"
                        : "Desktop";

                // Screen
                const screenWidth = window.screen.width;
                const screenHeight = window.screen.height;

                // Website
                const currentPage = window.location.pathname;
                const landingPage = window.location.href;
                const host = window.location.hostname;
                const language = navigator.language;
                const timezone =
                    Intl.DateTimeFormat().resolvedOptions().timeZone;

                const referrer = document.referrer || "Direct";

                // Default values
                let ip = "";
                let country = "";
                let countryCode = "";
                let region = "";
                let city = "";
                let latitude = "";
                let longitude = "";
                let isp = "";

                // Fetch IP Information
                try {
                    const response = await fetch("https://ipwho.is/");
                    const data = await response.json();

                    ip = data.ip || "";
                    country = data.country || "";
                    countryCode = data.country_code || "";
                    region = data.region || "";
                    city = data.city || "";
                    latitude = data.latitude || "";
                    longitude = data.longitude || "";
                    isp = data.connection?.isp || "";
                } catch (error) {
                    console.log("IP lookup failed", error);
                }

                // Save to Firebase
                await addDoc(collection(db, "visitors"), {
                    session_id: sessionId,

                    ip,
                    country,
                    country_code: countryCode,
                    state: region,
                    city,
                    latitude,
                    longitude,
                    isp,

                    browser,
                    os,
                    device,
                    user_agent: userAgent,

                    screen_width: screenWidth,
                    screen_height: screenHeight,

                    language,
                    timezone,

                    referrer,

                    landing_page: landingPage,
                    current_page: currentPage,

                    host,

                    created_at: serverTimestamp(),
                    updated_at: serverTimestamp(),
                });

                sessionStorage.setItem("visitor_tracked", "true");
            } catch (error) {
                console.error("Visitor Tracking Error:", error);
            }
        };

        trackVisitor();
    }, []);

    return null;
};

export default VisitorTracker;