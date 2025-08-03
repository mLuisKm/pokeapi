import React from "react";
import Image from "next/image";
import styles from "./ByAbility.module.css"

export default function ByAbility({name, response}) {
    return (
        <div>
        <div id="response-header" className={styles.responseHeader}>
                    <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
            </div>
            <div id="response-items" className={styles.responseItems}>
                <div className={styles.itemSingle}>
                    <span id="item-title" className={styles.itemTitle}>Who can learn it?</span>
                    <ul>
                        {
                            response.map((res, index) => (
                                <li key={index}>
                                    {res.name}
                                    {res.hidden && 
                                        <Image
                                            className={styles.itemType}
                                            src="/hiden.png"
                                            alt=""
                                            width={180}
                                            height={38}
                                            priority
                                        />
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div> 
        </div>
    )
}