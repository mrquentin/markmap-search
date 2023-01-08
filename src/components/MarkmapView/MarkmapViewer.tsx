import {IMarkmapOptions, INode} from "markmap-common";
import React, {Fragment, MutableRefObject, useContext, useEffect, useRef, useState} from "react";
import {Markmap} from "markmap-view";
import {Transformer} from "markmap-lib";
import {SearchDataContext} from "../AppBar/SearchDataContext";
import useDebounce from "./useDebounce";
import {getNodes, search} from "./SearchUtils";

const transformer = new Transformer()

export default function MarkmapViewer({
                                          filePath,
                                          markmapOptions
                                      }: { filePath: string, markmapOptions?: Partial<IMarkmapOptions> }) {
    const [value, setValue] = useState<string>()
    const svg = useRef() as MutableRefObject<SVGSVGElement>
    const markmap = useRef() as MutableRefObject<Markmap>

    const nodes = useRef() as MutableRefObject<INode[]>
    const searchContext = useContext(SearchDataContext)
    const debouncedSearch = useDebounce(searchContext.value, 500)

    useEffect(() => {
        fetch(filePath)
            .then(res => res.text())
            .then(txt => setValue(txt))
    }, [])

    useEffect(() => {
        if (markmap.current) return
        if (markmapOptions) markmap.current = Markmap.create(svg.current, markmapOptions)
        else markmap.current = Markmap.create(svg.current)
    }, [])

    useEffect(() => {
        const mm = markmap.current
        if (!mm || !value) return
        const {root} = transformer.transform(value)
        mm.setData(root)
        mm.fit()
    }, [markmap.current, value])

    useEffect(() => {
        if (!markmap.current) return
        if (markmap.current.state.data) nodes.current = getNodes(markmap.current.state.data)
    }, [markmap.current])

    // Search
    useEffect(() => {
        if (!nodes.current || !markmap.current) return
        let res = search(markmap.current.state.data, nodes.current, debouncedSearch)
        markmap.current.setData(res)
        markmap.current.fit()
    }, [debouncedSearch])

    return <Fragment>
        <svg style={{display: 'flex', width: '100%', minHeight: '90vh'}} ref={svg}/>
    </Fragment>
}