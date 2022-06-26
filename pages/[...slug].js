import Head from "next/head";
import { BROWSERS } from "../lib/fetch";
import { Record } from "../components/Record";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

import * as fs from "fs"

const Feature = props => {
    const { record, browser } = props

    return (
        <>
            <Head>
                <title>{record.fields.Name.toLowerCase()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')} | {browser.charAt(0).toUpperCase() + browser.slice(1)}</title>
            </Head>
            <Header />
            <details open>
                <summary className={`p_05em bb_1px pt_2em`}>
                    <strong>
                        {record.fields.Category}
                    </strong>
                </summary>
                <Record
                    record={record}
                    color="red"
                    browser={browser}
                />
            </details>
            <Footer />
        </>
    )
}

export default Feature

export async function getStaticProps({ params }) {
    const [slug, browser] = params.slug
    const filename = `features/${slug}.json`

    const record = JSON.parse(fs.readFileSync(filename))

    return {
        props: { record, browser: browser || "" },
        revalidate: 10
    };
}

export async function getStaticPaths() {
    const paths = []

    fs.readdirSync("features").forEach(file => {
        const [slug, _] = file.split(".")
        const path = { params: { slug: [slug] } }

        paths.push(path)
        BROWSERS.forEach(b => {
            paths.push({ params: { slug: [slug, b.toLowerCase()] } })
        })
    })

    return {
        paths,
        fallback: false
    }
}