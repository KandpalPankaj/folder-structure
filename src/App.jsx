import { useState } from "react";
import Folder from "./components/Folder";
import "./styles.css";
import explorer from "./data/folderData";
import useTreeEditor from "./hooks/use-tree-editor";

export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode, deleteNode, renameNode } = useTreeEditor();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData({ ...finalTree });
  };

  const handleDeleteNode = (nodeId) => {
    const finalTree = deleteNode(explorerData, nodeId);
    setExplorerData({ ...finalTree });
  };

  const handleRenameNode = (nodeId, newName) => {
    const finalTree = renameNode(explorerData, nodeId, newName);
    setExplorerData({ ...finalTree });
  };

  return (
    <div className="App">
      <Folder
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
        handleRenameNode={handleRenameNode}
        explorer={explorerData}
      />
    </div>
  );
}
