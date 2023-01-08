import {Transformer} from "markmap-lib";
import React, {MutableRefObject, useContext, useEffect, useRef, useState} from "react";
import {Markmap} from "markmap-view";
import {IMarkmapOptions, INode} from "markmap-common"
import {SearchDataContext} from "../AppBar/SearchDataContext";
import {getNodes} from "./SearchUtils";

const transformer = new Transformer()

type MarkmapViewProp = {
    filePath: string
    markmapOptions?: Partial<IMarkmapOptions>
}

export default function MarkmapView({filePath, markmapOptions}: MarkmapViewProp) {
    const [mind_map, setMindMap] = useState<string | null>()
    const refSvg = useRef() as MutableRefObject<SVGSVGElement>
    const refMarkmap = useRef<Markmap>()
    const refRoot = useRef<INode>()
    const nodes = useRef<INode[]>()
    const searchContext = useContext(SearchDataContext)

    //fetch the markmap data from file
    useEffect(() => {
        fetch(filePath)
            .then(res => res.text())
            .then(text => setMindMap(text))
    }, [filePath])

    // const debouncedSearch = useMemo(() => debounce((tree: INode | undefined) => console.log(`Matching nodes: ${searchTree(tree, searchContext.value).map((node) => '\n- ' + node.content)}`), 300), [searchContext.value])

    //handle search
    // useEffect(() => {
    //     const mm = refMarkmap.current as unknown as Markmap
    //     if (mm && nodes.current) refRoot.current = search(mm.state.data, nodes.current, "katex.md")
    //     // if (mm && nodes.current) refMarkmap.current?.setData(search(mm.state.data, nodes.current, searchContext.value))
    //
    // }, [searchContext.value])

    // useEffect(() => {
    //     console.log('mm state: ', refMarkmap.current?.state)
    // }, [refMarkmap.current?.state])

    //Create the markmap object
    useEffect(() => {
        console.log('create mm')
        if (refMarkmap.current) return
        if (markmapOptions) refMarkmap.current = Markmap.create(refSvg.current, markmapOptions)
        else refMarkmap.current = Markmap.create(refSvg.current)
    }, [refSvg.current])

    //Update root node value
    useEffect(() => {
        console.log('Set root')
        if (!mind_map) return
        refRoot.current = transformer.transform(mind_map).root
        // refMarkmap.current.setData(root)
    }, [mind_map])

    //fit the markmap to the page on change
    useEffect(() => {
        console.log('fit')
        if (!refMarkmap.current || !refRoot.current) return
        refMarkmap.current.setData(refRoot.current)
        refMarkmap.current.fit()
        if (refMarkmap.current.state) nodes.current = getNodes(refMarkmap.current.state.data)
    }, [refMarkmap.current, refRoot.current])

    return <React.Fragment>
        <svg style={{display: 'flex', width: '100%', minHeight: '90vh'}} ref={refSvg}/>
    </React.Fragment>
}

