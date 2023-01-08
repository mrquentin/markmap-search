import {INode, walkTree} from "markmap-common";

export function getNodes(tree: INode | undefined): INode[] {
    let nodes: INode[] = []
    walkTree(tree, (node, next) => {
        if (node) nodes.push(node)
        next()
    })
    return nodes
}

export function search(tree: INode | undefined, nodes: INode[], searchValue: string): INode | undefined {
    if (!tree) return
    let searchResult = searchNodes(nodes, searchValue)
    tree = foldTree(tree)
    return unfoldSearch(tree, searchResult)
}

export function searchNodes(nodes: INode[], searchValue: string): INode[] {
    return nodes.filter(node => node.content.toLowerCase().includes(searchValue.toLowerCase()))
}

export function unfoldSearch(tree: INode, searchResult: INode[]): INode {
    let paths: string[] = []
    searchResult.forEach((res) => {
        if (res.state && res.state.path) paths.push(res.state.path)
    })
    paths.forEach((path) => unfoldPath(tree, path))
    return tree
}

export function unfoldPath(tree: INode, path: string): INode {
    let ids: number[] = path.split('.').map((str) => parseInt(str))
    ids.forEach((id) => tree = unfoldNode(tree, id))
    return tree
}

export function unfoldNode(tree: INode, nodeId: number): INode {
    walkTree(tree, (node, next) => {
        if (node && node.state && node.state.id !== nodeId) next()
        else if (node && node.payload) {
            node.payload.fold = 0
        }
    })
    return tree
}

export function foldTree(tree: INode): INode {
    walkTree(tree, (node, next) => {
        if (node.payload) node.payload.fold = 1
        next()
    })
    return tree
}

export function unfoldTree(tree: INode): INode {
    walkTree(tree, (node, next) => {
        if (node.payload) node.payload.fold = 0
        next()
    })
    return tree
}