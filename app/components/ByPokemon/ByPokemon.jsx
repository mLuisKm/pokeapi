"use client"
import React from "react";
import Image from "next/image";
import styles from "./ByPokemon.module.css"
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";

export default function ByPokemon({basics, evolves, abilities}) {
    const [pSprites, setpSprites] = useState([]);
    const [abDesc, setAbDesc] = useState([]);
        useEffect(() => {
            const getSprites = async () => {
                const spritePromises = evolves.map(async (poke, index) => {
                    const req = await fetch(`/api/pokemon/${poke.name}`)
                    const res = await req.json()
                    return {name: poke.name, is_baby:poke.is_baby, sprite: res.basics.sprites.front}
                })
                const spriteResolved = await Promise.all(spritePromises)
                setpSprites(spriteResolved)
            }
            getSprites()
        }, [evolves])
        useEffect(() => {
            const getAbDesc = async () => {
                const descPromises = abilities.map(async (desc, index) => {
                    const req = await fetch(`/api/ability/${desc.name}`)
                    const res = await req.json()
                    console.log(res.response.effect)
                    return {name: desc.name, hidden: desc.hidden, desc: res.response.effect}
                })
                const descResolved = await Promise.all(descPromises)
                setAbDesc(descResolved)
            }
            getAbDesc()
        }, [abilities])
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
                        {pSprites.map((evolve, index) => (
                            <React.Fragment key={index}>
                                <li id={`${evolve.name}`} className={styles.specie}>
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
                                <Tooltip anchorSelect={`#${evolve.name}`} place="top">
                                    <Image
                                        className={styles.imgPokeToolTip}
                                        src={evolve.sprite}
                                        alt={`${evolve.name} sprite`}
                                        width={180}
                                        height={38}
                                    />
                                </Tooltip>
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
                <div className={styles.itemRight}>
                    <span id="item-title" className={styles.itemTitle}>Abilities</span>
                    <ul>
                        {abDesc.map((ability, index) => (
                            <React.Fragment key={index}>
                                <li id={`${ability.name}`}>
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
                                <Tooltip className={styles.aDesc} anchorSelect={`#${ability.name}`} place="top">
                                    <span>{ability.desc}</span>
                                </Tooltip>
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
            </div>
        </div>)
    )
}