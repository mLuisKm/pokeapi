"use client"
import React from "react";
import Image from "next/image";
import styles from "./ByAbility.module.css"
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";

export default function ByAbility({name, response}) {
    const [data, setData] = useState([]);
    useEffect(() => {
        const getSprites = async () => {
            const spritePromises = response.map(async (poke, index) => {
                const req = await fetch(`/api/pokemon/${poke.name}`)
                const res = await req.json()
                return {name: poke.name, hidden:poke.hidden, sprite: res.basics.sprites.front}
            })
            const spriteResolved = await Promise.all(spritePromises)
            setData(spriteResolved)
        }
        getSprites()
    }, [response])

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
                            data.map((res, index) => (
                                <React.Fragment key={index}>
                                    <li id={`${res.name}`} className="pokemon">
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
                                    <Tooltip anchorSelect={`#${res.name}`} place="top">
                                        <Image
                                            className={styles.imgPoke}
                                            src={res.sprite}
                                            alt={`${res.name} sprite`}
                                            width={180}
                                            height={38}
                                        />
                                    </Tooltip>
                                </React.Fragment>
                            ))
                        }
                    </ul>
                </div>
            </div> 
        </div>
    )
}