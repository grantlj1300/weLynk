import React, { useState } from "react";
import styles from "../../styles/EditProfile/EditProfileModal.module.css";
import { AiOutlineClose, AiOutlineCheckCircle } from "react-icons/ai";
import InfoTab from "./InfoTab";
import PhotoTab from "./PhotoTab";
import LocationTab from "./LocationTab";

export default function EditProfileModal({ closeModal, user, setUser }) {
    const [croppedImg, setCroppedImg] = useState(
        user?.avatar ? user.avatar : ""
    );
    const [infoForm, setInfoForm] = useState({
        first: user.first,
        last: user.last,
        email: user.email,
        bio: user.bio,
    });
    const [userView, setUserView] = useState(
        user.defaultRegion ? user.defaultRegion : null
    );
    const [activeTab, setActiveTab] = useState("info");

    async function updateUser() {
        try {
            const reqBody = {
                userId: user._id,
                first: infoForm.first,
                last: infoForm.last,
                avatar: croppedImg,
                defaultRegion: userView,
            };
            const res = await fetch("/api/user", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reqBody),
            });
            const data = await res.json();
            console.log(data);
            setUser(data);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    return (
        <div className={styles.modalScreen}>
            <div className={styles.header}>
                <AiOutlineClose
                    className={styles.button}
                    size={25}
                    onClick={() => closeModal()}
                />
                <div>Edit Profile</div>
                <AiOutlineCheckCircle
                    className={styles.button}
                    size={35}
                    onClick={async () => {
                        await updateUser();
                        closeModal();
                    }}
                />
            </div>
            <div className={styles.body}>
                <div className={styles.tabNameContainer}>
                    <h1
                        className={`${styles.tabName} ${
                            activeTab === "info" ? styles.activeTab : ""
                        }`}
                        onClick={() => setActiveTab("info")}
                    >
                        Info
                    </h1>
                    <h1
                        className={`${styles.tabName} ${
                            activeTab === "photo" ? styles.activeTab : ""
                        }`}
                        onClick={() => setActiveTab("photo")}
                    >
                        Photo
                    </h1>
                    <h1
                        className={`${styles.tabName} ${
                            activeTab === "location" ? styles.activeTab : ""
                        }`}
                        onClick={() => setActiveTab("location")}
                    >
                        Location
                    </h1>
                </div>
                <InfoTab
                    infoForm={infoForm}
                    setInfoForm={setInfoForm}
                    active={activeTab === "info"}
                />
                <PhotoTab
                    croppedImg={croppedImg}
                    setCroppedImg={setCroppedImg}
                    active={activeTab === "photo"}
                />
                <LocationTab
                    userView={userView}
                    setUserView={setUserView}
                    active={activeTab === "location"}
                />
            </div>
        </div>
    );
}
