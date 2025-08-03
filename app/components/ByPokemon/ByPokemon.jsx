import React from "react";
import Image from "next/image";
import styles from "./ByPokemon.module.css"

export default function ByPokemon({basics, evolves, abilities}) {

    return(
        (basics && evolves && abilities &&
        <div>
            <div id="response-header" className={styles.responseHeader}>
                <span>{basics.name.charAt(0).toUpperCase() + basics.name.slice(1)}</span>
                <span>({basics.id})</span>
            </div>
            <div id="response-items" className={styles.responseItems}>
                <div className={styles.itemLeft}>
                    <span id="item-title" className={styles.itemTitle}>Sprites</span>
                    <div className={styles.itemImage}>
                        <Image
                            className={styles.imgPoke}
                            src={basics.sprites.front}
                            alt=""
                            width={180}
                            height={38}
                            priority
                        />
                        <Image
                            className={styles.imgPoke}
                            src={basics.sprites.back}
                            alt=""
                            width={180}
                            height={38}
                            priority
                        />
                    </div>
                </div>
                <div className={styles.itemRight}>
                    <span id="item-title" className={styles.itemTitle}>Weight / Height</span>
                    <h2>{basics.weight} / {basics.height}</h2>
                </div>
                <div className={styles.itemLeft}>
                    <span id="item-title" className={styles.itemTitle}>Evolution chain</span>
                    <ul>
                        {evolves.map((evolve, index) => (
                            <li key={index} className={styles.specie}>
                                {evolve.name}
                                {evolve.is_baby &&
                                <Image
                                    className={styles.itemType}
                                    src="/baby.png"
                                    alt=""
                                    width={180}
                                    height={38}
                                    priority
                                />}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.itemRight}>
                    <span id="item-title" className={styles.itemTitle}>Abilities</span>
                    <ul>
                        {abilities.map((ability, index) => (
                            <li key={index}>
                                {ability.name}
                                {ability.hidden &&
                                <Image
                                    className={styles.itemType}
                                    src="/hiden.png"
                                    alt=""
                                    width={180}
                                    height={38}
                                    priority
                                />}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>)
    )
}