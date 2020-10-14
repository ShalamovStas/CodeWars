$closeNodeModelBtn = $("#closeNodeModelBtn");
$addNodeBtn = $("#addNodeBtn");

$closeNodeModelBtn.on("click", () => {
    nodeFormService.hideForm();
})

$addNodeBtn.on("click", () => {
    $("#nodeName-newNode").removeClass("is-invalid");
    $("#nodeId-newNode").removeClass("is-invalid");
    $("#parentId-newNode").removeClass("is-invalid");
    $("#error-message").addClass("d-none")

    let nodeName = $("#nodeName-newNode").val();
    let nodeId = $("#nodeId-newNode").val();
    let parentId = $("#parentId-newNode").val();

    if (!nodeName || !parentId || !nodeId) {
        $("#nodeName-newNode").addClass("is-invalid")
        $("#parentId-newNode").addClass("is-invalid")
        $("#nodeId-newNode").addClass("is-invalid")
        $("#error-message").removeClass("d-none")
        $("#error-message").text("Model is not valid")

        return;
    }

    let newNode = { name: nodeName, id: nodeId, children: [] }
    let res = addNode(nodeList = treeModel.nodeList, parentId = parentId, nodeModel = newNode);

    if (!res.success) {
        $("#nodeName-newNode").addClass("is-invalid")
        $("#parentId-newNode").addClass("is-invalid")
        $("#nodeId-newNode").addClass("is-invalid")

        $("#error-message").removeClass("d-none")
        $("#error-message").text(res.error)
        console.log(res.error);
        return;
    }

    buildTreeView(getTreeRootNode(res.nodeList));
})

$("#deleteNodeBtn").on("click", () => {
    let nodeId = $("#nodeId").val();

    if (!nodeId)
        throw "nodeId not valid";

    let currentNode = treeModel.nodeList.find(n => {
        return n.id === nodeId;
    })

    console.log(currentNode)

    if (!currentNode)
        throw "currentNode not found";


    let parentNode = getParenNodeByChildId(treeModel.nodeList, nodeId);
    console.log("parentNode, ", parentNode)
    if (!parentNode)
        throw "parentNodeData not found";


    treeModel.nodeList.forEach(node => {
        if (node.id === parentNode.id) {

            currentNode.children.forEach(childrenNode => {
                let childrenAlreadyAdded = parentNode.children.find(x => { return x.id === childrenNode.id })

                if (!childrenAlreadyAdded)
                    node.children.push(childrenNode);
            });

            console.log("node.id === parentNode.id", node)
            console.log(node.children)

            node.children = node.children.filter(x => { return x.id !== currentNode.id });
            console.log(node.children)
        }
    });

    // let newNnodeList = [];

    // console.log(treeModel.nodeList)

    // treeModel.nodeList.forEach(node => {
    //     if (node.id != currentNode.id)
    //         newNnodeList.push(node);
    //     else(
    //         console.log("skip[ped")
    //     )
    // });

    // treeModel.nodeList = newNnodeList;
    // console.log(treeModel.nodeList)

    buildTreeView(getTreeRootNode(treeModel.nodeList));
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
buildTreeView(treeModel.rootNode);

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