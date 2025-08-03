import React from "react";
import styles from "./ResponseSection.module.css"

export default function ResponseSection({children}) {
    return (
        <section id="responses" className={styles.responses}>
            <div id="response" className={styles.response}>
                {children}
            </div>
        </section>
    )
}