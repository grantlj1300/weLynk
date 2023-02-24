import React, { useState, useRef } from "react";
import styles from "../styles/EditProfileModal.module.css";
import { FiCamera, FiTrash2 } from "react-icons/fi";
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";
import MiniMapWrapper from "./MiniMapWrapper";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Image from "next/image";

export default function EditProfileModal({ closeModal, user, setUser }) {
    const [srcImg, setSrcImg] = useState();
    const cropperRef = useRef(null);
    const inputFile = useRef(null);
    const [croppedImg, setCroppedImg] = useState(
        user?.avatar ? user.avatar : ""
    );
    const [showFileSelector, setShowFileSelector] = useState(false);
    const [nameForm, setNameForm] = useState({
        first: user.first,
        last: user.last,
    });
    const [userView, setUserView] = useState(
        user.defaultRegion ? user.defaultRegion : null
    );

    const onCrop = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        setCroppedImg(cropper.getCroppedCanvas().toDataURL());
    };

    function handlePhotoChange(e) {
        if (e.target.files[0]) {
            setSrcImg(URL.createObjectURL(e.target.files[0]));
        }
    }

    function openFileSelector() {
        inputFile.current.click();
    }

    function handleNameChange(e) {
        const { name, value } = e.target;
        setNameForm((prevData) => ({ ...prevData, [name]: value }));
    }

    function handleImageDelete() {
        setSrcImg(null);
        inputFile.current.value = "";
        setCroppedImg("");
    }

    async function updateUser() {
        try {
            const reqBody = {
                userId: user._id,
                first: nameForm.first,
                last: nameForm.last,
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
                <AiOutlineCloseCircle
                    className={styles.button}
                    size={35}
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
                <div className={styles.preview}>
                    <Image
                        className={styles.avatar}
                        src={
                            croppedImg.length > 0
                                ? croppedImg
                                : "/assets/img/default-avi.jpeg"
                        }
                        alt="Avatar"
                        onMouseEnter={() => setShowFileSelector(true)}
                        width={150}
                        height={150}
                    />
                    <input
                        className="edit-profile-name"
                        name="first"
                        value={nameForm.first}
                        onChange={handleNameChange}
                        placeholder="First"
                        maxLength={20}
                    />
                    <input
                        className="edit-profile-name"
                        name="last"
                        value={nameForm.last}
                        onChange={handleNameChange}
                        placeholder="Last"
                        maxLength={20}
                    />
                    <div
                        className={styles.avatarOverlay}
                        style={
                            showFileSelector
                                ? { visibility: "visible" }
                                : { visibility: "hidden" }
                        }
                        onMouseLeave={() => setShowFileSelector(false)}
                    >
                        <FiCamera
                            className={styles.leftIcon}
                            size={30}
                            onClick={openFileSelector}
                        />
                        <FiTrash2
                            className={styles.rightIcon}
                            size={30}
                            onClick={handleImageDelete}
                        />
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        ref={inputFile}
                        onChange={handlePhotoChange}
                        style={{ display: "none" }}
                    />
                </div>
                {srcImg && (
                    <div className={styles.cropRegion}>
                        <Cropper
                            src={srcImg}
                            style={{ height: 400, width: 400 }}
                            initialAspectRatio={1}
                            aspectRatio={1}
                            guides={false}
                            crop={onCrop}
                            ref={cropperRef}
                            viewMode={1}
                            minCropBoxHeight={100}
                            minCropBoxWidth={100}
                            background={false}
                            responsive={true}
                            autoCropArea={1}
                            checkOrientation={false}
                        />
                    </div>
                )}
                <MiniMapWrapper
                    regionView={userView}
                    setUserView={setUserView}
                />
            </div>
        </div>
    );
}
