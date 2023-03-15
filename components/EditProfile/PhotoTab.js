import React, { useRef, useState } from "react";
import styles from "../../styles/EditProfile/Photo.module.css";
import { FiCamera, FiTrash2 } from "react-icons/fi";
import Image from "next/image";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

export default function PhotoTab({ croppedImg, setCroppedImg, active }) {
    const cropperRef = useRef(null);
    const inputFile = useRef(null);
    const [showFileSelector, setShowFileSelector] = useState(false);
    const [srcImg, setSrcImg] = useState();
    const [crop, setCrop] = useState({ height: 400, width: 400 });

    function openFileSelector() {
        inputFile.current.click();
    }

    function handlePhotoChange(e) {
        if (e.target.files[0]) {
            setSrcImg(URL.createObjectURL(e.target.files[0]));
        }
    }

    function handleImageDelete() {
        setSrcImg(null);
        inputFile.current.value = "";
        setCroppedImg("");
    }

    function onCrop() {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        setCroppedImg(cropper.getCroppedCanvas().toDataURL());
    }

    function getDimensions() {
        if (screen.width < 530) {
            setCrop({ height: 250, width: 250 });
        } else {
            setCrop({ height: 400, width: 400 });
        }
    }

    return (
        <div className={`${styles.container} ${active ? styles.show : ""}`}>
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
                    onClick={() => {
                        getDimensions();
                        openFileSelector();
                    }}
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
            {srcImg && (
                <div className={styles.cropRegion}>
                    <Cropper
                        src={srcImg}
                        style={{ height: crop.height, width: crop.width }}
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
        </div>
    );
}
