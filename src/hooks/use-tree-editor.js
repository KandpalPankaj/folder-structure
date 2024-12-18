const useTreeEditor = () => {
  const insertNode = function (tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder: isFolder,
        items: [],
      });

      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((ob) => {
      return insertNode(ob, folderId, item, isFolder);
    });

    return { ...tree, items: latestNode };
  };

  const deleteNode = function (tree, nodeId) {
    if (tree.id === nodeId) {
      return null;
    }

    if (tree.isFolder) {
      tree.items = tree.items
        .map((item) => deleteNode(item, nodeId))
        .filter(Boolean);
    }
    console.log(tree);

    return tree;
  };

  const renameNode = function (tree, nodeId, newName) {
    if (tree.id === nodeId) {
      return { ...tree, name: newName };
    }

    if (tree.isFolder) {
      tree.items = tree.items.map((item) => renameNode(item, nodeId, newName));
    }

    return tree;
  };

  return { insertNode, deleteNode, renameNode };
};

export default useTreeEditor;
