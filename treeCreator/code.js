$closeNodeModelBtn = $("#closeNodeModelBtn");
$addNodeBtn = $("#addNodeBtn");

$closeNodeModelBtn.on("click", () => {
    nodeFormService.hideForm();
})

$addNodeBtn.on("click", () => {

})

const nodeFormService = {

    displayForm(node) {
        if (!node)
            node = { id: "", name: "", children: [] }

        console.log(node)

        $("#nodeForm").removeClass("d-none");

        $nodeName = $("#nodeName");
        $nodeName.val(node.name);
        $("#nodeId").val(node.id)

        $children = $("#children");
        $children.empty();
        node.children.forEach(n => {
            var li = $('<li class="list-group-item"></li>').text(n.name);
            $children.append(li)
        })

    },

    hideForm() {
        $("#nodeForm").addClass("d-none");
    }
}

const treeModel = initTree();

console.log(treeModel)


buildTreeView(treeModel.rootNode);

let newNode = { name: "test", id: "test", children: [] }
let res = addNode(treeModel.nodeList, "fixedPrice", newNode);
console.log(res)

let rootNode = getRootNode(res.nodeList)
buildTreeView(rootNode);






function handleData(data) {
    return data;
    let newNodes = [];
    data.forEach(node => {

        data.forEach(innerNode => {
            if (node.data.name === innerNode.data.name &&
                node.x != innerNode.x && node.y != innerNode.y && node.x < innerNode.x) {
                console.log("dubclicate, ", innerNode);
                innerNode.x = node.x;
                innerNode.y = node.y;
            }
        })

    });

    return data;
}


nodeFormService.displayForm();