"use client"
import { useState } from "react";
import FacebookLogin, { SuccessResponse } from "@greatsumini/react-facebook-login";

const FacebookLoginButton = () => {
    const [message, setMessage] = useState<{ text: string, severity: "error" | "success" }>();

    const onSuccessHandler = async (response: SuccessResponse) => {
        const apiResponse = await fetch("/api/facebook-login", {
            method: "POST",
            body: JSON.stringify({ userId: response.userID, accessToken: response.accessToken })
        });
        const data = await apiResponse.json();
        if (data.success) setMessage({ text: "Login Successful.", severity: "success" })
    }

    return (
        <div>
            <FacebookLogin
                appId="985291506702352"
                onSuccess={onSuccessHandler}
                onFail={(error) => {
                    setMessage({ text: "Error occured", severity: "error" });
                }}
                render={({ onClick }) => (
                    <button onClick={onClick}>
                        {/* If you want you can place here facebook icon */}
                        Login to Facebook
                    </button>
                )}
            />
            {message &&
                <div className={`${message.severity === "error" ? "text-red-600" : "text-green-600"}`}>
                    {message.text}
                </div>
            }
        </div>
    );
};

export default FacebookLoginButton;