const WEB3FORMS_URL = "https://api.web3forms.com/submit";

/**
 * Send Contact Form Email using Web3Forms
 *
 * @param {Object} formData
 * @returns {Promise<Object>}
 */
export const sendContactEmail = async (formData) => {
    try {
        const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

        if (!accessKey) {
            return {
                success: false,
                message: "Web3Forms Access Key is missing.",
            };
        }

        const payload = {
            access_key: accessKey,

            name: formData.name,

            email: formData.email,

            phone: formData.phone,

            company: formData.company,

            subject: formData.subject,

            message: formData.message,

            from_name: "Dev Span Portfolio",

            replyto: "contact@yourdomain.com",

            autoresponse: `Hi ${formData.name},

                Thank you for contacting me.

                I have successfully received your message.

                I'll get back to you as soon as possible.

                Best Regards,
                Dev Span`
        };

        const response = await fetch(WEB3FORMS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(payload),
        });

        const result = await response.json();
        console.log("result==>", result);
        if (!response.ok || !result.success) {
            return {
                success: false,
                message: result.message || "Unable to send email.",
                data: result,
            };
        }

        return {
            success: true,
            message: "Email sent successfully.",
            data: result,
        };
    } catch (error) {
        console.error("Web3Forms Error:", error);

        return {
            success: false,
            message: error.message || "Something went wrong.",
            error,
        };
    }
};