import Head from "next/head";
import { BROWSERS } from "../lib/fetch";
import { Record } from "../components/Record";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { AddNew } from "../components/AddNew";

import * as fs from "fs"

const Feature = props => {
    const { record, records, browser, slug } = props
    const title = record.fields.Name.toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ') + " | " + browser.charAt(0).toUpperCase() + browser.slice(1)

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta property="twitter:url" content={`https://canidev.tools/${slug}/${browser}`} />
                <meta property="twitter:title" content={title} />
                {record.fields.Description ? 
                    <meta property="twitter:description" content={record.fields.Description} /> 
                : null}
                {record.fields.Image ? <meta
                    property="twitter:image"
                    content={record.fields.Image}
                /> : null}
            </Head>
            <Header records={records} />
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
            <AddNew />
            <Footer />
        </>
    )
}

export default Feature

export async function getStaticProps({ params }) {
    const [slug, browser] = params.slug
    const filename = `features/${slug}.json`

    const record = JSON.parse(fs.readFileSync(filename))
    const records = fs.readdirSync("features")

    return {
        props: { record, records, slug, browser: browser || "" },
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