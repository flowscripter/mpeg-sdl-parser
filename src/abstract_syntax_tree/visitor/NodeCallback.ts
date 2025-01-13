import AbstractNode from "../node/AbstractNode.ts";

interface NodeCallback<T> {
    beforeVisit(node: AbstractNode, context: T): void;
    afterVisit(node: AbstractNode, context: T): void;
}

export default NodeCallback;
