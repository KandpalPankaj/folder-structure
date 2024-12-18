import { useState } from "react";
import ActionButtons from "./ActionButtons";
import InputField from "./InputField";

const Folder = ({
  explorer,
  handleInsertNode,
  handleDeleteNode,
  handleRenameNode,
  depth = 0,
}) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleAddNode = (name, isFolder) => {
    handleInsertNode(explorer.id, name, isFolder);
    setShowInput({ visible: false, isFolder: false });
  };

  const handleRename = (newName) => {
    handleRenameNode(explorer.id, newName);
    setIsEditing(false);
  };

  const renderContent = () => {
    if (isEditing) {
      return (
        <InputField
          defaultValue={explorer.name}
          onSubmit={handleRename}
          onCancel={() => setIsEditing(false)}
          isFolder={explorer.isFolder}
          placeholder="Enter new name"
        />
      );
    }

    return (
      <span
        className={`
        ${explorer.isFolder ? "text-blue-600" : "text-gray-800"}
        font-medium
      `}
      >
        {explorer.name}
      </span>
    );
  };

  if (explorer.isFolder) {
    return (
      <div
        className="bg-gray-50 rounded-lg shadow-sm my-2 p-2"
        style={{ marginLeft: `${depth * 20}px` }}
      >
        <div className="flex justify-between items-center  hover:bg-gray-100 p-2 rounded-md transition-colors">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setExpand(!expand)}
          >
            <span>📁</span>
            {renderContent()}
          </div>

          <ActionButtons
            isFolder={true}
            isRootFolder={explorer.id === "1"}
            onAddFolder={(isFolder) => {
              setExpand(true);
              setShowInput({ visible: true, isFolder });
            }}
            onRename={() => setIsEditing(true)}
            onDelete={() => handleDeleteNode(explorer.id)}
          />
        </div>

        {expand && (
          <div className="pl-6 mt-2 border-l-2 border-gray-200">
            {showInput.visible && (
              <InputField
                onSubmit={(name) => handleAddNode(name, showInput.isFolder)}
                onCancel={() =>
                  setShowInput({ visible: false, isFolder: false })
                }
                isFolder={showInput.isFolder}
                placeholder={`New ${
                  showInput.isFolder ? "folder" : "file"
                } name`}
              />
            )}

            {explorer.items.map((item) => (
              <Folder
                key={item.id}
                explorer={item}
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
                handleRenameNode={handleRenameNode}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-between bg-white p-2 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
      style={{ marginLeft: `${depth * 20}px` }}
    >
      <div className="flex items-center space-x-2">
        <span>📄</span>
        {renderContent()}
      </div>

      <ActionButtons
        isFolder={false}
        isRootFolder={explorer.id === "1"}
        onRename={() => setIsEditing(true)}
        onDelete={() => handleDeleteNode(explorer.id)}
      />
    </div>
  );
};

export default Folder;
