import React from "react";
import styles from "../styles/Carousel.module.css";

export default function Carousel({ children }) {
    const carouselItems = children.map((child, index) => (
        <div key={index} className={styles.item}>
            {child}
        </div>
    ));

    return (
        <div className={styles.container}>
            <div className={styles.items}>{carouselItems}</div>
        </div>
    );
}
