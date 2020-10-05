const $engagementChooseBlock = $('.card');
const engagementChooseBlockCount = $('.card').length;
const $btnYes = $('.btn-yes-js');
const $btnNo = $('.btn-no-js');
const $btnPrevious = $('.btn-previous-js');

const cartIDs = {
    //question cards
    projectDurationOver6Months: "projectDurationOver6Months",
    fullTime: "fullTime",
    technicalSupportAndMinorUpdates: "technicalSupportAndMinorUpdates",
    projectDurationUnder2Months: "projectDurationUnder2Months",
    specification: "specification",
    changesExpected: "changesExpected",

    //result cards
    dedicatedTeam: "dedicated-team",
    supportPackage: "support-package",
    timeAndMaterials: "time-materials",
    fixedPrice: "fixed-price"
}

var cardsTree = {

    projectDurationOver6Months: {
        id: cartIDs.projectDurationOver6Months,
        answer: undefined,

        finalNode: false,
        node_yes: undefined,
        node_no: undefined
    },

    fullTime: {
        id: cartIDs.fullTime,
        answer: undefined,

        finalNode: false,
        node_yes: undefined,
        node_no: undefined
    },

    dedicatedTeam: {
        id: cartIDs.dedicatedTeam,
        answer: undefined,

        finalNode: true,
        node_yes: undefined,
        node_no: undefined
    },

    technicalSupportAndMinorUpdates: {
        id: cartIDs.technicalSupportAndMinorUpdates,
        answer: undefined,

        finalNode: false,
        node_yes: undefined,
        node_no: undefined
    },

    supportPackage: {
        id: cartIDs.supportPackage,
        answer: undefined,

        finalNode: true,
        node_yes: undefined,
        node_no: undefined
    },

    projectDurationUnder2Months: {
        id: cartIDs.projectDurationUnder2Months,
        answer: undefined,

        finalNode: false,
        node_yes: undefined,
        node_no: undefined
    },

    specification: {
        id: cartIDs.specification,
        answer: undefined,

        finalNode: false,
        node_yes: undefined,
        node_no: undefined
    },

    changesExpected: {
        id: cartIDs.changesExpected,
        answer: undefined,

        finalNode: false,
        node_yes: undefined,
        node_no: undefined
    },

    timeAndMaterials: {
        id: cartIDs.timeAndMaterials,
        answer: undefined,

        finalNode: true,
        node_yes: undefined,
        node_no: undefined
    },

    fixedPrice: {
        id: cartIDs.fixedPrice,
        answer: undefined,

        finalNode: true,
        node_yes: undefined,
        node_no: undefined
    },



    initTree() {
        this.projectDurationOver6Months.node_yes = this.fullTime;
        this.projectDurationOver6Months.node_no = this.projectDurationUnder2Months;

        this.fullTime.node_yes = this.dedicatedTeam;
        this.fullTime.node_no = this.technicalSupportAndMinorUpdates;

        this.technicalSupportAndMinorUpdates.node_yes = this.supportPackage;
        this.technicalSupportAndMinorUpdates.node_no = this.timeAndMaterials;

        this.projectDurationUnder2Months.node_yes = this.specification;
        this.projectDurationUnder2Months.node_no = this.timeAndMaterials;

        this.specification.node_yes = this.changesExpected;
        this.specification.node_no = this.timeAndMaterials;

        this.changesExpected.node_yes = this.timeAndMaterials;
        this.changesExpected.node_no = this.fixedPrice;

        for (var key in this) {
            this[key].answer = undefined
        }
    }
}


const treeEngine = {

    startNode: cardsTree.projectDurationOver6Months,

    findNextTreeNode: function() {

        let node = this.processTree(this.startNode);
        if (!node)
            throw "Node not found";
        return node;
    },

    processTree: function(node) {
        if (!node)
            throw "Node is not valid";

        if (node.finalNode)
            return node;

        if (node.answer === true) {
            return this.processTree(node.node_yes);
        }

        if (node.answer === false) {
            return this.processTree(node.node_no);
        }

        if (node.answer === undefined) {
            return node;
        }

        throw "Appropriate node not found";
    },

    getPreviousTreeNodeByChildId: function(childNodeId) {
        for (var key in cardsTree) {
            if (!cardsTree[key].node_yes || !cardsTree[key].node_no)
                continue;

            if (cardsTree[key].node_yes.id === childNodeId ||
                cardsTree[key].node_no.id === childNodeId) {
                return cardsTree[key];
            }
        }

        return childNodeId;
    },

    setNodeAnswerByNodeId: function(id, answer) {

        for (var key in cardsTree) {
            if (cardsTree[key].id === id) {
                cardsTree[key].answer = answer;
                return;
            }
        }
    }
}

const contentWizardHelper = {
    showCardById: (id) => {
        $('.engagement-choose__block--current')
            .removeClass('engagement-choose__block--current');

        document.getElementById(id).classList.add('engagement-choose__block--current');
    }
}

const wizardControl = {
    contentWizardHelper: contentWizardHelper,
    currentCard: undefined,

    initWizard: function() {
        cardsTree.initTree();
        this.currentCard = cardsTree.projectDurationOver6Months;
        contentWizardHelper.showCardById(this.currentCard.id);
    },

    nextCardExtended: function(answer) {
        treeEngine.setNodeAnswerByNodeId(this.currentCard.id, answer)
        this.currentCard = treeEngine.findNextTreeNode();
        contentWizardHelper.showCardById(this.currentCard.id);
    },

    previousExtended: function() {
        let previousNode = treeEngine.getPreviousTreeNodeByChildId(this.currentCard.id)
        treeEngine.setNodeAnswerByNodeId(previousNode.id, undefined)
        this.currentCard = treeEngine.findNextTreeNode();
        contentWizardHelper.showCardById(this.currentCard.id);
    },
}
wizardControl.initWizard();


$btnYes.each(function(i, btn) {
    $(btn).on('click', () => {
        wizardControl.nextCardExtended(true);
    })
})

$btnNo.each(function(i, btn) {
    $(btn).on('click', () => {
        wizardControl.nextCardExtended(false);
    })
})

$btnPrevious.each(function(i, btn) {
    $(btn).on('click', () => {
        wizardControl.previousExtended();
    })
})

$('.btn-again-js').each(function(i, btn) {
    $(btn).on('click', () => {
        wizardControl.initWizard();
    })
})