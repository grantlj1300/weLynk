import React, { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import styles from "../../styles/BuildEvent.module.css";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

export default function PhotoSelection({
    prevStep,
    nextStep,
    handlePhotoCrop,
    submitForm,
    image,
}) {
    const [srcImg, setSrcImg] = useState(image);
    const [croppedImg, setCroppedImg] = useState();
    const cropperRef = useRef(null);

    const onCrop = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        const newURL = cropper.getCroppedCanvas().toDataURL();
        setCroppedImg(newURL);
        handlePhotoCrop(newURL);
    };

    // function handlePhotoChange(e) {
    //     if (e.target.files[0]) {
    //         setSrcImg(URL.createObjectURL(e.target.files[0]));
    //     }
    // }

    async function imageCheck() {
        const buffer = Buffer.from(
            croppedImg.substring(croppedImg.indexOf(",") + 1),
            "base64"
        );
        if (buffer >= 2) {
            console.log("Too Large!");
            return;
        }
        submitForm().then((res) => {
            if (res) {
                nextStep();
            }
        });
    }

    function handleLoadAvatar(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = (e) => {
            var img = document.createElement("img");
            img.onload = () => {
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);

                var MAX_WIDTH = 600;
                var MAX_HEIGHT = 600;
                var width = img.width;
                var height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);
                var dataurl = canvas.toDataURL("image/png");
                setSrcImg(dataurl);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    return (
        <div className={styles.formBody}>
            <label className={styles.label}>Upload a photo:</label>
            <input type="file" accept="image/*" onChange={handleLoadAvatar} />
            {srcImg && (
                <div className={styles.cropArea}>
                    <Cropper
                        src={srcImg}
                        style={{ height: 300, width: 300 }}
                        initialAspectRatio={16 / 11}
                        aspectRatio={16 / 11}
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
            <div className={styles.buttonContainer}>
                <MdNavigateBefore
                    className={styles.button}
                    onClick={prevStep}
                    size={35}
                />
                <MdNavigateNext
                    className={styles.button}
                    onClick={imageCheck}
                    size={35}
                />
            </div>
        </div>
    );
}
