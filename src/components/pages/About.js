import React, { useState, useEffect } from 'react'
import ReactMarkDown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import * as PageDesign from "./design/PageDesign"
import about from "../content/about.md"


const About = () => {

    const [markdown, setMarkdown] = useState("");

    useEffect(() => {
        fetch(about)
            .then((res) => res.text())
            .then((text) => setMarkdown(text));
    }, []);



    return (
        <div className="max-w-3xl mx-auto p-5">
            <ReactMarkDown
                components={{
                    h1: PageDesign.h1,
                    h2: PageDesign.h2,
                    h3: PageDesign.h3,
                    p: PageDesign.p,
                    a: PageDesign.a,
                    ol: PageDesign.ol,
                    li: PageDesign.li
                }}
                children={markdown}
                remarkPlugins={[remarkGfm]} />
            {/* <pre>{JSON.stringify(markdown, null, 2)}</pre> */}
        </div>

    )
}

export default About